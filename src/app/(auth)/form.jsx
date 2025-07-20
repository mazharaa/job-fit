"use client";

import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { registerAction } from "./action";
import { loginAction } from "./action";

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
      </form>
    </div>
  );
};

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
    <form className="space-y-4" action={action}>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          name="password"
          placeholder="Password"
          type="password"
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <button
        disabled={pending}
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
};
