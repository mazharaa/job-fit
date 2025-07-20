"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction(_) {
  const cookieStore = await cookies();

  cookieStore.delete("userId");
  console.log("test");
  redirect("/");
}
