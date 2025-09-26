"use client";

import { AnalysisResults } from "@/components/analysis-results";
import { mockAnalysis } from "@/lib/mock-analysis";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Resume Analysis Demo</h1>
      <AnalysisResults
        analysis={mockAnalysis}
        onExportPDF={() => console.log("Export PDF clicked")}
        onExportText={() => console.log("Export Text clicked")}
      />
    </main>
  );
}
