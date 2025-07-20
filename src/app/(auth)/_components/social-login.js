import React from "react";

import { googleLoginAction } from "../action";

export default function SocialLogin() {
  return (
    <form action={googleLoginAction}>
      <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded hover:bg-gray-100 text-sm">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Login with Google
      </button>
    </form>
  );
}
