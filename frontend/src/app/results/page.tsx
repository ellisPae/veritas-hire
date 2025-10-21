"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AnalysisResults from "@/components/AnalysisResults";
import AnalyzingLoader from "@/components/AnalyzingLoader";

const ResultsPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDemoMode, setIsDemoMode] = useState(false);

  const router = useRouter();

  const handleReset = () => {
    sessionStorage.clear();
    router.push("/resume-upload");
  };

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        const storedResume = sessionStorage.getItem("resumeText");
        const storedJob = sessionStorage.getItem("jobListing");
        const isDemoResume = sessionStorage.getItem("isDemoResume") === "true";
        const isDemoJob = sessionStorage.getItem("isDemoJob") === "true";

        const demoMode = isDemoResume && isDemoJob;
        setIsDemoMode(demoMode);

        console.log("🧩 Demo flags:", { isDemoResume, isDemoJob });

        if (!storedResume || !storedJob) {
          setError("Missing resume or job listing data. Please start again.");
          return;
        }

        if (demoMode) {
          console.log("✅ Using demo results (no OpenAI call)");
          const demoRes = await fetch("/demo/demo-results.json");
          const demoData = await demoRes.json();
          setData(demoData);
        } else {
          console.log("🚀 Running OpenAI analysis...");
          const res = await fetch("/api/final-analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              resumeText: storedResume,
              jobListing: JSON.parse(storedJob),
            }),
          });

          if (!res.ok) throw new Error("Failed to generate analysis");

          const result = await res.json();
          setData(result.analysis);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
        sessionStorage.removeItem("isDemoResume");
        sessionStorage.removeItem("isDemoJob");
      }
    };

    runAnalysis();
  }, []);

  if (loading) return <AnalyzingLoader />;

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-600 dark:text-red-400">
        {error}
      </div>
    );

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No data available.
      </div>
    );

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {isDemoMode && (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-medium shadow-md z-50">
          Demo Mode Active — Showing Pre-Generated Results
        </div>
      )}

      <div
        className={`absolute right-6 z-40 transition-all duration-300 ${
          isDemoMode ? "top-14" : "top-4"
        }`}
      >
        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-base shadow-md hover:opacity-90 transition-transform transform hover:scale-[1.02]"
        >
          Start Over
        </button>
      </div>

      {/* Results content */}
      <div className="relative z-10 pt-16">
        <AnalysisResults {...data} />
      </div>
    </main>
  );
};

export default ResultsPage;
