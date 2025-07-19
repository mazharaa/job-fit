"use client";

import { useActionState } from "react";
import { analyzeCvJobFitAction } from "./action";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const FormJobFitAnalysis = () => {
  const [state, action, pending] = useActionState(analyzeCvJobFitAction, null);
  return (
    <form action={analyzeCvJobFitAction} className="space-y-7">
      <div className="space-y-2">
        <Label htmlFor="jobDescription">Detail Job Description</Label>
        <Textarea
          placeholder="Enter the detailed job description you’re targeting here."
          name="jobDesc"
          rows={10}
        />
      </div>
      <div className="space-y-2 w-80">
        <Label htmlFor="cv-upload">Upload CV</Label>
        <Input name="cv" type="file" />
      </div>
      <Button>Match</Button>
    </form>
  );
};
