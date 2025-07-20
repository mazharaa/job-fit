"use client";

import { useState } from "react";
import FileUploadBox from "./_components/fileuploadbox";

export const UploadForm = () => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploaded file:", file.name);
      setFileName(file.name);
    }
  };

  return (
    <form className="space-y-4">
      <FileUploadBox onFileSelect={handleFileUpload} />
      {fileName && (
        <p className="text-sm text-green-600">File uploaded: {fileName}</p>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Start Evaluation
      </button>
    </form>
  );
};
