export type InsightType = "skills" | "experience" | "growth";

export interface AnalysisInsights {
  skills: string;
  experience: string;
  growth: string;
}

export interface AnalysisResultsProps {
  overallScore: number;
  skillsMatch: number;
  experienceMatch: number;
  growthPotential: number;
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];
  summary: string;
  insights: AnalysisInsights;
}
