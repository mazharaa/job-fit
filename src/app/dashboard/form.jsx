"use client";

import { useActionState, useEffect } from "react";
import { logoutAction } from "./action";

export const LogoutForm = () => {
  const [state, action, pending] = useActionState(logoutAction, null);

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
        <button>Logout</button>
      </form>
    </div>
  );
};
