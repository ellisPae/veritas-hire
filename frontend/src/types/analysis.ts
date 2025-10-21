// ----------------------
//  Insight Types
// ----------------------
export type InsightType = "skills" | "experience" | "growth";

export interface KeywordsMatch {
  matched: string[];
  missing: string[];
}

export interface InsightData {
  narrative: string;
  keywordsMatch?: KeywordsMatch;
}

// ----------------------
//  Analysis Results
// ----------------------
export interface AnalysisInsights {
  skills: InsightData;
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

// ----------------------
//  Modal Props
// ----------------------
export interface InsightModalProps {
  type: InsightType;
  score: number;
  insight: string | InsightData;
  onClose: () => void;
}
