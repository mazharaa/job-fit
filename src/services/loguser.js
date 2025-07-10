import "server-only";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getLogUser() {
  const cookieStore = await cookies();
  const isUserId = cookieStore.get("userId")?.value;

  if (!isUserId) {
    redirect("/");
  }

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

  return logUser;
}
