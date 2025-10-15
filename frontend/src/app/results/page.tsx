"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnalysisResults from "@/components/AnalysisResults";
import type { AnalysisResultsProps } from "@/types/analysis";

export default function ResultsPage() {
  const [data, setData] = useState<AnalysisResultsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runFinalAnalysis = async () => {
      try {
        const storedResume = sessionStorage.getItem("resumeText");
        const storedJob = sessionStorage.getItem("jobListing");

        if (!storedResume || !storedJob) {
          setError("Missing resume or job listing data. Please start again.");
          setLoading(false);
          return;
        }

        let resumeText;
        try {
          resumeText = JSON.parse(storedResume);
        } catch {
          resumeText = storedResume;
        }
        const jobListing = JSON.parse(storedJob);

        const res = await fetch("/api/final-analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText, jobListing }),
        });

        if (!res.ok) throw new Error("Failed to generate analysis");
        const result = await res.json();
        setData(result.analysis);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    runFinalAnalysis();
  }, []);

  // 🌀 Modern loading animation
  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-600 dark:text-gray-300">
        <div className="text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Analyzing your profile
          </h2>
          <div className="flex justify-center items-center space-x-2 mt-4">
            <span
              className="inline-block w-3 h-3 rounded-full bg-blue-500 animate-pulse"
              style={{ animationDelay: "0s" }}
            ></span>
            <span
              className="inline-block w-3 h-3 rounded-full bg-indigo-500 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="inline-block w-3 h-3 rounded-full bg-purple-500 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>
        </div>
      </main>
    );
  }

  // ❌ Error message
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-red-500 text-center text-lg font-medium"
        >
          {error}
        </motion.div>
      </main>
    );
  }

  // ⚠️ No data fallback
  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-600 dark:text-gray-300">
        No results found.
      </main>
    );
  }

  // ✅ Animated results fade-in
  return (
    <AnimatePresence>
      <motion.div
        key="results"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AnalysisResults {...data} />
      </motion.div>
    </AnimatePresence>
  );
}
