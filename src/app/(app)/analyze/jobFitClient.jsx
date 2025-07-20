"use client";

import { useActionState } from "react";
import { analyzeCvJobFitAction } from "./action";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const JobFitClient = () => {
  const [state, action, pending] = useActionState(analyzeCvJobFitAction, null);

  return (
    <div className="space-y-10">
      <form action={action} className="space-y-7">
        <div className="space-y-2">
          <Label htmlFor="jobDesc">Detail Job Description</Label>
          <Textarea
            id="jobDesc"
            name="jobDesc"
            placeholder="Enter the detailed job description you’re targeting here."
            rows={10}
          />
        </div>
        <div className="space-y-2 w-80">
          <Label htmlFor="cv">Upload CV</Label>
          <Input id="cv" name="cv" type="file" />
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Matching..." : "Match"}
        </Button>
      </form>

      <div>
        <Label>Job Match Analysis</Label>
        <div className="min-h-[100px] border p-4 rounded-md bg-muted mt-2">
          {pending && (
            <div className="animate-pulse text-muted-foreground">
              Analyzing CV and Job Description...
            </div>
          )}
          {!pending && state?.content && (
            <div className="whitespace-pre-line">{state.content}</div>
          )}
          {!pending && !state?.content && (
            <div className="text-muted-foreground">No analysis available.</div>
          )}
        </div>
      </div>
    </div>
  );
};
