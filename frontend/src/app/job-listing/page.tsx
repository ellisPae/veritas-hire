"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import JobListingForm from "@/components/JobListingForm";
import AnimatedBackgroundBlobs from "@/components/AnimatedBackgroundBlobs";

import type { JobDetails } from "@/types/job";
import demoJobListing from "@/../public/demo/demo-job-listing.json";

const JobListingPage = () => {
  const router = useRouter();

  const [demoData, setDemoData] = useState<JobDetails | null>(null);

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

  const handleUseDemo = () => {
    try {
      setDemoData({
        title: demoJobListing.title,
        company: demoJobListing.company,
        location: demoJobListing.location,
        description: demoJobListing.description,
      });
    } catch (err) {
      console.error("Failed to load demo job listing:", err);
      alert("Failed to load demo job listing.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-6">
      {/* Background blobs */}
      <AnimatedBackgroundBlobs />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-5 space-y-4"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tell Us About the Role
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-900 text-sm dark:text-white">
            Fill in the job details and let our AI reveal how they align with
            the right skills and experience.
            <br />
            We’ll surface your strengths, highlight the gaps, and give you a
            clearer path forward.
          </p>
        </div>

        {/* Job Listing Form */}
        <JobListingForm onSubmit={handleSubmit} demoData={demoData} />
      </motion.div>

      {/* Demo Job Listing Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-6 flex flex-col items-center justify-center space-y-2"
      >
        <p className="text-xs text-gray-500 text-center">
          Want to try without filling the form? Use a demo job listing:
        </p>

        <button
          onClick={() => {
            handleUseDemo();
            window.dispatchEvent(
              new CustomEvent("useDemoJobListing", { detail: demoJobListing })
            );
            sessionStorage.setItem("isDemoJob", "true");
          }}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:shadow-lg hover:scale-[1.02] transition transform opacity-80 hover:opacity-100 text-xs"
        >
          Use Demo Job Listing →
        </button>
      </motion.div>
    </main>
  );
};

export default JobListingPage;
