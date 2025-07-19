"use server";

import { openai } from "@/utils/openai";

export async function analyzeCvJobFitAction(_, formData) {
  const jobDesc = formData.get("jobDesc");
  const file = formData.get("cv");

  const uploadedFile = await openai.files.create({
    file: file,
    purpose: "user_data",
  });

  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_file",
            file_id: uploadedFile.id,
          },
          {
            type: "input_text",
            text: `Please refrain from giving suggestions nor feedback. Just analyze the uploaded CV and rate its alignment with the following job description on a scale of 0 to 100: ${jobDesc}`,
          },
        ],
      },
    ],
  });

  return {
    content: response.output_text,
  };
}
