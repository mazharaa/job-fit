"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function registerAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
  } catch (error) {
    return {
      status: "failed",
      message: "User already Exist",
    };
  }
  redirect("/");
}
