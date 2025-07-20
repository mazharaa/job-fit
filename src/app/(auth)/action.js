"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { google } from "@/utils/arctic";
import { createUser, getUserByEmail } from "@/services/user";
import * as arctic from "arctic";

export async function registerAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await getUserByEmail(email);
  if (user) {
    return { error: "User already exists" };
  }

  const newUser = await createUser(name, email, password);
  return { success: "User created successfully", user: newUser };
}

export async function loginAction(_, formData) {
  const cookieStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");
  let user = null;
  const getWithPassword = true;

  try {
    user = await getUserByEmail(email, getWithPassword);
  } catch (error) {
    console.log(error);
    return {
      status: "failed",
      message: "Error",
    };
  }
  console.log(user);

  if (!user) {
    return {
      status: "failed",
      message: "User Not Found",
    };
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: "failed",
        message: "Invalid Password",
      };
    }
  } catch (error) {
    return {
      status: "failed",
      message: "Error",
    };
  }

  cookieStore.set("userId", user.id, {
    httpOnly: true,
    maxAge: 1000 * 30,
  });

  redirect("/dashboard");
}

export async function googleLoginAction() {
  const cookieStore = await cookies();

  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["openid", "profile", "email"];
  const url = google.createAuthorizationURL(state, codeVerifier, scopes);

  cookieStore.set("codeVerifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 5,
    path: "/",
  });

  redirect(url);
}
