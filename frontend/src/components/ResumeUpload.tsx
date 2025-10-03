"use client";

import { useState } from "react";
import type { ResumeUploadState } from "@/types/resume";

interface ResumeUploadProps {
  fileState: ResumeUploadState;
  onFileUpload: (file: File) => void;
  onFileError: (error: string) => void;
  onRemoveFile: () => void;
  onAnalysisComplete?: (data: any) => void; // 👈 callback for API results
}

export default function ResumeUpload({
  fileState,
  onFileUpload,
  onFileError,
  onRemoveFile,
  onAnalysisComplete,
}: ResumeUploadProps) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      onFileError("File size exceeds 5MB");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      onFileError("Only PDF, DOC, and DOCX files are supported");
      return;
    }

    // ✅ Update UI state
    onFileUpload(file);

    // ✅ Send file to API
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to analyze resume");

      const data = await res.json();

      // 👇 Call parent with API results
      if (onAnalysisComplete) {
        onAnalysisComplete(data);
      }
    } catch (err: any) {
      onFileError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {fileState.isUploaded && fileState.file ? (
        <div className="flex flex-col items-center space-y-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Uploaded: <span className="font-medium">{fileState.file.name}</span>
          </p>
          {loading ? (
            <p className="text-sm text-blue-500">Analyzing resume...</p>
          ) : (
            <button
              onClick={onRemoveFile}
              className="px-4 py-2 text-sm rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition"
            >
              Remove File
            </button>
          )}
        </div>
      ) : (
        <label className="w-full cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-gray-700/50 transition shadow-sm">
          <p className="mb-3 text-gray-600 dark:text-gray-400 font-medium">
            Drag & drop your resume here
          </p>
          <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:shadow-lg hover:scale-105 active:scale-95 transition">
            Choose File
          </span>
          <input type="file" onChange={handleFileChange} className="hidden" />
          <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
            Supports PDF, DOC, DOCX (max 5MB)
          </p>
        </label>
      )}

      {fileState.error && (
        <p className="text-sm text-red-500">{fileState.error}</p>
      )}
    </div>
  );
}
