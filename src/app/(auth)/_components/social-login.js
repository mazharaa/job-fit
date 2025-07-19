import React from "react";

import { Button } from "@/components/ui/button";

import { googleLoginAction } from "../action";

export default function SocialLogin() {
  return (
    <form action={googleLoginAction}>
      <Button variant="secondary" className="w-full">
        Continue with Google
      </Button>
    </form>
  );
}
