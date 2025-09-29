"use client";

import { useRouter } from "next/navigation";
import JobListing from "@/components/JobListing";
import { motion } from "framer-motion";

export default function JobListingPage() {
  const router = useRouter();

  const handleSubmit = (jobText: string) => {
    // MVP: store job text in localStorage
    localStorage.setItem("jobListing", jobText);
    router.push("/results");
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-6">
      {/* Background animation blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -40, 40, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Role Description
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            Paste the job description below. Our AI will analyze it against your
            resume and give tailored insights.
          </p>
        </div>

        {/* Job Listing Input Component */}
        <JobListing onSubmit={handleSubmit} />
      </motion.div>
    </main>
  );
}
