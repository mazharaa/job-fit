"use server";

export async function evaluateJobPosting(formData) {
  const file = formData.get("file");
  if (!file) return { error: "No file uploaded." };

  // processing logic here
  return { success: true, fileName: file.name };
}
