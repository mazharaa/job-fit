"use client";

import { UploadCloud } from "lucide-react";

const FileUploadBox = ({ onFileSelect }) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <UploadCloud className="mx-auto mb-2" size={24} />
      <p className="font-medium text-sm">
        Choose a CV file or drag & drop it here.
      </p>
      <p className="text-xs text-gray-400 mt-1">PDF or DOCX, up to 10 MB.</p>
      <input
        type="file"
        className="hidden"
        id="file-upload"
        onChange={onFileSelect}
      />
      <label
        htmlFor="file-upload"
        className="mt-4 inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm cursor-pointer"
      >
        Browse CV
      </label>
    </div>
  );
};

export default FileUploadBox;
