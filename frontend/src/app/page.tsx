"use client";

import { AnalysisResults } from "@/components/analysis-results";
import { mockAnalysis } from "@/lib/mock-analysis";

export default function HomePage() {
  return (
    <main className="container mx-auto px-6 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Resume Analysis Demo
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload your resume and get instant AI-powered insights.
        </p>
      </header>

      <AnalysisResults
        analysis={mockAnalysis}
        onExportPDF={() => console.log("Export PDF clicked")}
        onExportText={() => console.log("Export Text clicked")}
      />
    </main>
  );
}
