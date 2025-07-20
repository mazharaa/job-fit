import "server-only";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getLogUser(pageId) {
  const cookieStore = await cookies();
  const isUserId = cookieStore.get("userId")?.value;
  console.log(isUserId);

  if (isUserId) {
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
    return logUser;
  }
}
