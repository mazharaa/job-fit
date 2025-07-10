"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "./action";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.status === "success") {
      console.log("Success!");
      return;
    }
    if (state?.status === "failed") {
      console.log("Failed!");
    }
  }, [state]);

  return (
    <div className="grid grid-cols-3 space-x-3">
      <form className="space-y-2 col-span-2 p-4" action={action}>
        <div>Login Acoount :</div>
        <Input name="email" placeholder="Email" type="email" />
        <Input name="password" placeholder="Password" type="password" />
        <button disabled={pending} type="submit">
          Login
        </button>
        {/* <button disabled={pending} type="submit">
          Login Google
        </button> */}
      </form>
    </div>
  );
};
