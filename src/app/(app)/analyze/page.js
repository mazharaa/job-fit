"use client";

import { useActionState } from "react";
import { analyzeCvJobFitAction } from "./action";
import { JobFitClient } from "./jobFitClient";

export default function Page() {
  const [state, action, pending] = useActionState(analyzeCvJobFitAction, null);
  return (
    <div>
      <main className="max-w-2xl m-auto my-12">
        <JobFitClient></JobFitClient>
      </main>
    </div>
  );
}
