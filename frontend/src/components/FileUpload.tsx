"use client";

import { useRef, useState } from "react";

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simple validation
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Max size is 5MB.");
      setFileName(null);
      return;
    }
    if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      setError("Invalid file type. Only PDF, DOC, and DOCX allowed.");
      setFileName(null);
      return;
    }

    setError(null);
    setFileName(file.name);
  };

  return (
    <div className="max-w-lg mx-auto p-6 border-2 border-dashed border-gray-300 rounded-xl bg-white shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Upload your resume
      </h2>

      <div className="flex flex-col items-center space-y-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Choose File
        </button>

        {fileName && (
          <p className="text-sm text-green-600 font-medium">
            ✅ {fileName} uploaded successfully
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 font-medium">⚠️ {error}</p>
        )}
      </div>
    </div>
  );
}
