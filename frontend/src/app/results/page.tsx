"use client";

import { useEffect, useState } from "react";
import AnalysisResults from "@/components/AnalysisResults";
import type { AnalysisResultsProps } from "@/types/analysis";

export default function ResultsPage() {
  const [data, setData] = useState<AnalysisResultsProps | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("analysisResults");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        No results found. Please upload a resume first.
      </main>
    );
  }

  return <AnalysisResults {...data} />;
}
