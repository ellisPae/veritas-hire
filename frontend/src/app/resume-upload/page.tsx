"use client";

import { useState } from "react";
import Link from "next/link";
import ResumeUpload from "@/components/ResumeUpload";
import { motion } from "framer-motion";
import type { ResumeUploadState } from "@/types/resume";

export default function ResumeUploadPage() {
  const [fileState, setFileState] = useState<ResumeUploadState>({
    file: null,
    isUploaded: false,
    error: null,
  });

  const handleFileUpload = (file: File) => {
    setFileState({ file, isUploaded: true, error: null });
  };

  const handleFileError = (error: string) => {
    setFileState({ file: null, isUploaded: false, error });
  };

  const handleRemoveFile = () => {
    setFileState({ file: null, isUploaded: false, error: null });
  };

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

      {/* Upload card */}
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

        {/* Upload Component with state + handlers */}
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
          />
        </motion.div>
      </motion.div>

      {/* Skip button pinned near bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-10"
      >
        <Link
          href="/job-listing"
          className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Skip to Job Listing →
        </Link>
      </motion.div>
    </main>
  );
}
