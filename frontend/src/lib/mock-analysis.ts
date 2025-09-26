import { AnalysisResult } from "@/types/analysis";

export const mockAnalysis: AnalysisResult = {
  overallScore: 76,
  skillsMatch: 82,
  experienceMatch: 70,
  keywordsMatch: 65,

  matchedKeywords: ["React", "TypeScript", "Agile", "API Design"],
  missingKeywords: ["GraphQL", "Docker"],

  strengths: [
    "Strong proficiency in modern frontend frameworks",
    "Proven experience working in Agile teams",
  ],
  weaknesses: [
    "Limited experience with containerization",
    "Needs more exposure to GraphQL APIs",
  ],

  transferableSkills: [
    {
      name: "Collaboration",
      score: 85,
      description: "Works effectively with cross-functional teams.",
    },
    {
      name: "Problem Solving",
      score: 90,
      description: "Can break down complex problems into actionable steps.",
    },
  ],

  recommendations: [
    "Highlight experience with containerization tools in resume.",
    "Include specific examples of API design contributions.",
    "Add measurable impact for previous roles.",
  ],
};
