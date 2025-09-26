"use client";

import {
  PieChart,
  Key,
  ThumbsUp,
  AlertTriangle,
  ArrowRightLeft,
  Lightbulb,
  Download,
  FileText,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import { AnalysisResult } from "@/types/analysis";

interface AnalysisResultsProps {
  analysis: AnalysisResult;
  onExportPDF: () => void;
  onExportText: () => void;
}

function ProgressRow({
  label,
  value,
  color,
  testId,
}: {
  label: string;
  value: number;
  color: string;
  testId: string;
}) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
      <span className="text-muted-foreground font-medium">{label}</span>
      <div className="flex items-center">
        <div className="w-32 h-2 bg-white/10 rounded-full mr-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${value}%`, background: color }}
          />
        </div>
        <span
          className="text-sm font-bold text-foreground min-w-[2.5rem]"
          data-testid={testId}
        >
          {value}%
        </span>
      </div>
    </div>
  );
}

export function AnalysisResults({
  analysis,
  onExportPDF,
  onExportText,
}: AnalysisResultsProps) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progressCircleStyle = {
    strokeDasharray: circumference,
    strokeDashoffset:
      circumference - (circumference * analysis.overallScore) / 100,
  };

  return (
    <div className="space-y-6">
      {/* Overall Match Score */}
      <div className="glass-card p-8 animate-fade-in-up">
        <h2 className="text-xl font-bold mb-8 flex items-center text-foreground">
          <div
            className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
            style={{ background: "var(--grad-primary)" }}
            aria-hidden="true"
          >
            <PieChart
              className="text-white"
              size={18}
              aria-label="Score icon"
            />
          </div>
          Overall Match Score
        </h2>

        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg
              className="w-40 h-40 transform -rotate-90"
              viewBox="0 0 84 84"
              role="img"
              aria-label={`Overall match score: ${analysis.overallScore}%`}
            >
              <circle
                cx="42"
                cy="42"
                r="38"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="42"
                cy="42"
                r="38"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                className="transition-all duration-1000 ease-out"
                style={progressCircleStyle}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="text-4xl font-black bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                  data-testid="text-overall-score"
                >
                  {analysis.overallScore}%
                </div>
                <div className="text-sm text-muted-foreground font-semibold">
                  Match
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <ProgressRow
            label="Skills Match"
            value={analysis.skillsMatch}
            color="var(--grad-primary)"
            testId="text-skills-match"
          />
          <ProgressRow
            label="Experience Level"
            value={analysis.experienceMatch}
            color="var(--grad-secondary)"
            testId="text-experience-match"
          />
          <ProgressRow
            label="Keywords"
            value={analysis.keywordsMatch}
            color="var(--grad-secondary)"
            testId="text-keywords-match"
          />
        </div>
      </div>

      {/* Keyword Matching */}
      <div className="glass-card p-8 animate-fade-in-up">
        <h2 className="text-xl font-bold mb-6 flex items-center text-foreground">
          <div
            className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
            style={{ background: "var(--grad-secondary)" }}
            aria-hidden="true"
          >
            <Key className="text-white" size={18} aria-label="Keywords icon" />
          </div>
          Keyword Analysis
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                <Check
                  className="text-green-400"
                  size={12}
                  aria-hidden="true"
                />
              </div>
              Matched Keywords ({analysis.matchedKeywords.length})
            </h3>
            <div
              className="flex flex-wrap gap-2"
              data-testid="matched-keywords"
            >
              {analysis.matchedKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="keyword-match px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:outline-none"
                  tabIndex={0}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center">
              <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mr-2">
                <X className="text-red-400" size={12} aria-hidden="true" />
              </div>
              Missing Keywords ({analysis.missingKeywords.length})
            </h3>
            <div
              className="flex flex-wrap gap-2"
              data-testid="missing-keywords"
            >
              {analysis.missingKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="keyword-missing px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                  tabIndex={0}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="text-lg font-bold mb-6 text-green-400 flex items-center">
            <div
              className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
              style={{ background: "var(--grad-success)" }}
              aria-hidden="true"
            >
              <ThumbsUp className="text-white" size={16} />
            </div>
            Strengths
          </h3>
          <ul className="space-y-4" data-testid="strengths-list">
            {analysis.strengths.map((strength) => (
              <li key={strength} className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check
                    className="text-green-400"
                    size={12}
                    aria-hidden="true"
                  />
                </div>
                <span className="text-sm text-foreground font-medium">
                  {strength}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="text-lg font-bold mb-6 text-red-400 flex items-center">
            <div
              className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
              style={{ background: "var(--grad-danger)" }}
              aria-hidden="true"
            >
              <AlertTriangle className="text-white" size={16} />
            </div>
            Areas to Improve
          </h3>
          <ul className="space-y-4" data-testid="weaknesses-list">
            {analysis.weaknesses.map((weakness) => (
              <li key={weakness} className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <X className="text-red-400" size={12} aria-hidden="true" />
                </div>
                <span className="text-sm text-foreground font-medium">
                  {weakness}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Transferable Skills */}
      <div className="glass-card p-8 animate-fade-in-up">
        <h2 className="text-xl font-bold mb-6 flex items-center text-foreground">
          <div
            className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
            style={{ background: "var(--grad-secondary)" }}
            aria-hidden="true"
          >
            <ArrowRightLeft className="text-white" size={18} />
          </div>
          Transferable Skills
        </h2>

        <div className="space-y-6">
          <p className="text-muted-foreground/80 text-sm font-medium">
            Skills from your experience that apply to this role:
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            data-testid="transferable-skills"
          >
            {analysis.transferableSkills.map((skill) => (
              <div
                key={skill.name}
                className="p-5 rounded-xl transition-all duration-200 hover:scale-[1.02] border border-white/10"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-foreground">{skill.name}</h4>
                  <div className="flex items-center">
                    <div className="w-20 h-1.5 bg-white/10 rounded-full mr-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.score}%`,
                          background: "var(--grad-primary)",
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {skill.score}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/80">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div
        className="glass-card p-8 animate-fade-in-up"
        style={{
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
        }}
      >
        <h2 className="text-xl font-bold mb-6 text-blue-300 flex items-center">
          <div
            className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
            style={{ background: "var(--grad-primary)" }}
            aria-hidden="true"
          >
            <Lightbulb className="text-white" size={18} />
          </div>
          Recommendations
        </h2>

        <ul className="space-y-4" data-testid="recommendations-list">
          {analysis.recommendations.map((recommendation) => (
            <li key={recommendation} className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                <ArrowRight
                  className="text-blue-400"
                  size={12}
                  aria-hidden="true"
                />
              </div>
              <span className="text-sm text-foreground font-medium">
                {recommendation}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Export Options */}
      <div className="glass-card p-8 animate-fade-in-up">
        <h2 className="text-xl font-bold mb-6 flex items-center text-foreground">
          <div
            className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
            style={{ background: "var(--grad-primary)" }}
            aria-hidden="true"
          >
            <Download className="text-white" size={18} />
          </div>
          Export Analysis
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={onExportPDF}
            aria-label="Export analysis as PDF"
            className="flex items-center justify-center px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "var(--grad-danger)",
              boxShadow: "var(--shadow-soft)",
            }}
            data-testid="button-export-pdf"
          >
            <FileText className="mr-2" size={18} aria-hidden="true" />
            Export as PDF
          </button>

          <button
            onClick={onExportText}
            aria-label="Export analysis as text"
            className="flex items-center justify-center px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "var(--grad-secondary)",
              boxShadow: "var(--shadow-soft)",
            }}
            data-testid="button-export-text"
          >
            <FileText className="mr-2" size={18} aria-hidden="true" />
            Export as Text
          </button>
        </div>
      </div>
    </div>
  );
}
