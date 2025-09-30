// The raw job description that the user pastes
export interface JobListingInput {
  rawText: string;
}

// Parsed/extrapolated fields (to be filled by AI or parsing later)
export interface JobDetails {
  title?: string; // e.g., "Frontend Developer"
  company?: string; // e.g., "Acme Corp"
  location?: string; // e.g., "Remote" or "New York, NY"
  employmentType?:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Internship"
    | "Temporary"
    | "Freelance";
  description?: string; // the full job description text
  requirements?: string[]; // extracted list of requirements
  skills?: string[]; // extracted list of skills
}
