"use client";

import { useState } from "react";
import FileUploadBox from "./_components/fileuploadbox";

const CvForm = () => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploaded CV:", file.name);
      setFileName(file.name);
    }
  };

  return (
    <form className="space-y-4">
      <FileUploadBox onFileSelect={handleFileUpload} />
      {fileName && (
        <p className="text-sm text-green-600">CV uploaded: {fileName}</p>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Match CV
      </button>
    </form>
  );
};

export default CvForm;
