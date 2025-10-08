"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import JobListingForm from "@/components/JobListingForm";
import type { JobDetails } from "@/types/job";

export default function JobListingPage() {
  const router = useRouter();

  const handleSubmit = async (job: JobDetails) => {
    try {
      // Show loading state (optional improvement)
      const res = await fetch("/api/job-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: job.title,
          company: job.company,
          description: job.description,
        }),
      });

      if (!res.ok) throw new Error("Failed to analyze job listing");

      const result = await res.json();

      // ✅ Store job data + AI analysis so Results page can use it
      sessionStorage.setItem("jobAnalysis", JSON.stringify(result.analysis));
      sessionStorage.setItem("jobListing", JSON.stringify(job));

      // ✅ Redirect to results
      router.push("/results");
    } catch (err) {
      console.error("Job listing submission failed:", err);
      alert("Something went wrong while analyzing the job listing.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-6">
      {/* Background blobs */}
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

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tell Us About the Role
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            Fill in the job details and let our AI reveal how they align with
            the right skills and experience. We’ll surface your strengths,
            highlight the gaps, and give you a clearer path forward.
          </p>
        </div>

        {/* Job Listing Form */}
        <JobListingForm onSubmit={handleSubmit} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-10"
      >
        <Link
          href="/results"
          className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Skip to Results →
        </Link>
      </motion.div>
    </main>
  );
}
