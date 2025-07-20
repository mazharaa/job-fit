import * as arctic from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUserByEmail } from "@/services/user";

import { google } from "@/utils/arctic";
import prisma from "@/utils/prisma";

export async function GET(request) {
  const cookieStore = await cookies();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const codeVerifier = cookieStore.get("codeVerifier")?.value;

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const accessToken = tokens.accessToken();

    const res = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userData = await res.json();

    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      cookieStore.set("userId", existingUser.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    } else {
      const newUser = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          googleUid: userData.sub,
        },
      });
      cookieStore.set("userId", newUser.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    }
  } catch (e) {
    if (e instanceof arctic.OAuth2RequestError) {
      const code = e.code;
      console.log({ code });
    }
    if (e instanceof arctic.ArcticFetchError) {
      const cause = e.cause;
      console.log({ cause });
    }
    console.log({ e });
    return new Response(
      "Invalid authorization code, credentials, or redirect URI",
      { status: 400 }
    );
  }

  // const idPage = cookieStore.get("currentPageId")?.value;
  // if (idPage) {
  //   redirect(`/job/analyzing/result/${idPage}`);
  // }
  redirect("/");
}
