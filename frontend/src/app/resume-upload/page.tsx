"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ResumeUpload from "@/components/ResumeUpload";
import { motion } from "framer-motion";
import type { ResumeUploadState } from "@/types/resume";

export default function ResumeUploadPage() {
  const [fileState, setFileState] = useState<ResumeUploadState>({
    file: null,
    isUploaded: false,
    error: null,
  });

  const [uploadComplete, setUploadComplete] = useState(false);
  const router = useRouter();

  // 🧹 Clear old session data on mount
  useEffect(() => {
    sessionStorage.removeItem("resumeText");
    sessionStorage.removeItem("analysisResults");
  }, []);

  useEffect(() => {
    const handleResumeUploaded = () => {
      setUploadComplete(true);
    };

    window.addEventListener("resumeUploaded", handleResumeUploaded);
    return () =>
      window.removeEventListener("resumeUploaded", handleResumeUploaded);
  }, []);

  const handleFileUpload = (file: File) => {
    setFileState({ file, isUploaded: true, error: null });
    setUploadComplete(false);
  };

  const handleFileError = (error: string) => {
    setFileState({ file: null, isUploaded: false, error });
    setUploadComplete(false);
  };

  const handleRemoveFile = () => {
    setFileState({ file: null, isUploaded: false, error: null });
    setUploadComplete(false);
    try {
      sessionStorage.removeItem("resumeText");
      sessionStorage.removeItem("analysisResults");
      sessionStorage.removeItem("isDemoResume");
    } catch (err) {
      console.error("Error clearing resume data:", err);
    }
  };

  // Store parsed resume text in sessionStorage and show Next button
  const handleAnalysisComplete = (data: any) => {
    try {
      sessionStorage.setItem("analysisResults", JSON.stringify(data));
    } catch {}
    setUploadComplete(true);
  };

  // Navigate to Job Listing page
  const handleNext = () => router.push("/job-listing");

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-6">
      {/* Background blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -40, 40, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 text-center space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Upload Your Resume
          </h1>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Upload your resume to uncover tailored insights on your strengths,
            weaknesses, and how well you align with your target roles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <ResumeUpload
            fileState={fileState}
            onFileUpload={handleFileUpload}
            onFileError={handleFileError}
            onRemoveFile={handleRemoveFile}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </motion.div>

        {uploadComplete && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col items-center space-y-4 w-full"
          >
            <button
              onClick={handleRemoveFile}
              className="w-full px-6 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Remove Resume
            </button>
            <button
              onClick={handleNext}
              className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition transform"
            >
              Next
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Demo Resume Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-10 flex flex-col items-center space-y-2"
      >
        <p className="text-xs text-gray-500 text-center">
          Want to try without uploading? Use a demo resume:
        </p>

        <button
          onClick={async () => {
            try {
              const response = await fetch("/demo/Avery_Park_Resume_DEMO.docx");
              const blob = await response.blob();
              const file = new File([blob], "Avery_Park_Resume_DEMO.docx", {
                type: blob.type,
              });

              const formData = new FormData();
              formData.append("resume", file);

              const res = await fetch("/api/resume-analyze", {
                method: "POST",
                body: formData,
              });

              if (!res.ok) throw new Error("Demo upload failed");
              const result = await res.json();

              // ✅ Save parsed resume text in sessionStorage
              sessionStorage.setItem("resumeText", result.resumeText);
              sessionStorage.setItem("isDemoResume", "true");

              // ✅ Update local state so UI updates as if user uploaded a file
              setFileState({
                file,
                isUploaded: true,
                error: null,
              });

              setUploadComplete(true); // show "Next" + "Remove Resume"
            } catch (err) {
              console.error("Demo resume upload failed:", err);
              alert("Failed to load demo resume.");
            }
          }}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:shadow-lg hover:scale-[1.02] transition transform opacity-80 hover:opacity-100 text-xs"
        >
          Use Demo Resume →
        </button>
      </motion.div>
    </main>
  );
}
