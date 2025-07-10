"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(_, formData) {
  const cookieStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");
  let user = null;

  try {
    user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
  } catch (error) {
    return {
      status: "failed",
      message: "Error",
    };
  }

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
