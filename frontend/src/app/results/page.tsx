"use client";

import { useEffect, useState } from "react";
import AnalysisResults from "@/components/AnalysisResults";
import type { AnalysisResultsProps } from "@/types/analysis";

export default function ResultsPage() {
  const [data, setData] = useState<AnalysisResultsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}), // later: send resume/job data
        });
        if (!res.ok) throw new Error("Failed to fetch analysis results");
        const result: AnalysisResultsProps = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 text-gray-600 dark:text-gray-300">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Analyzing your resume and job description...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-6 py-4 rounded-xl shadow-md">
          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        No results found.
      </main>
    );
  }

  return <AnalysisResults {...data} />;
}
