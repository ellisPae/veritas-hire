export interface AnalysisResult {
  overallScore: number;
  skillsMatch: number;
  experienceMatch: number;
  keywordsMatch: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  transferableSkills: TransferableSkill[];
  recommendations: string[];
}

export interface TransferableSkill {
  name: string;
  score: number;
  description: string;
  color?: string;
}

export interface FileUploadState {
  file: File | null;
  isUploaded: boolean;
  error: string | null;
}
