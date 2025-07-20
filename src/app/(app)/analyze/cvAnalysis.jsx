"use client";

import React, { useActionState } from "react";
import { analyzeCvJobFitAction } from "./action";
import { Label } from "@/components/ui/label";

export const CvAnalysis = () => {
  const [state, action, pending] = useActionState(analyzeCvJobFitAction, null);
  return (
    <div>
      <Label>Job Match Analysis</Label>
      <div></div>
    </div>
  );
};
