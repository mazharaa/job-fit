"use server";

import { generateCredibilityTask } from "@/trigger/tasks.js";

export async function evaluateJobAction(_, formData) {
  const jobImages = formData.getAll("job-image");

  let base64Images = [];

  for (const file of jobImages) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    base64Images.push(base64Image);
  }

  const analyzedData = await generateCredibilityTask.trigger({ base64Images });

  return {
    runId: analyzedData.id,
    publicAccessToken: analyzedData.publicAccessToken,
  };
}
