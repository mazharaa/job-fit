"use client";

import { useActionState, useEffect } from "react";
import { registerAction } from "./action";
import { Input } from "@/components/ui/input";

export const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, null);

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
        <div>Register Acoount :</div>
        <Input name="name" placeholder="Name" />
        <Input name="email" placeholder="Email" type="email" />
        <Input name="password" placeholder="Password" type="password" />
        <button disabled={pending} type="submit">
          Register
        </button>
        {/* <button disabled={pending} type="submit">
          Register Google
        </button> */}
      </form>
    </div>
  );
};
