import "server-only";
import prisma from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getLogUser() {
  const cookieStore = await cookies();
  const isUserId = cookieStore.get("userId").value;

  console.log("Check userid");
  console.log(isUserId);
  if (!isUserId) {
    redirect("/");
  }
  console.log("Check log user");

  const logUser = await prisma.user.findFirst({
    where: {
      id: isUserId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!logUser) {
    redirect("/");
  }

  console.log(logUser);

  return logUser;
}
