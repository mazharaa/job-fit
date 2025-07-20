"use server";

export async function matchCV(formData) {
  const file = formData.get("file");
  if (!file) return { error: "No CV uploaded." };

  // processing logic here
  return { success: true, fileName: file.name };
}
