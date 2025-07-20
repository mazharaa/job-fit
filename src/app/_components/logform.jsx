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
      <form action={action}>
        <button
          type="submit"
          className="text-sm text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </form>
    </div>
  );
};
