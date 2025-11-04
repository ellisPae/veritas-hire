import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { JobDetails } from "@/types/job";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  try {
    const {
      resumeText,
      jobListing,
    }: { resumeText: string; jobListing: JobDetails } = await req.json();

    const { title, company, location, description } = jobListing || {};

    if (!resumeText || !jobListing) {
      return NextResponse.json(
        { error: "Missing resume or job listing data" },
        { status: 400 }
      );
    }

    const prompt = `
      You are an experienced technical hiring manager and career analyst.
      Analyze and compare the candidate’s resume against the job listing below.
      Return your response **only** as a valid, well-structured JSON object in the following exact format:
      Ensure all numeric fields are whole numbers (no decimals) and logically consistent (overallScore should generally fall between the lowest and highest sub-scores).
      All numeric fields (overallScore, skillsMatch, experienceMatch, growthPotential) must be integer percentage scores between 0 and 100 (no decimals or fractions).
      Each score must be independently reasoned and reflect its respective dimension:
      - "skillsMatch" evaluates alignment between the resume's technical keywords, tools, and proficiencies with those emphasized in the job description.
      - "skillsMatch" should weigh the quantity and relevance of overlapping technical terms, frameworks, and languages.
      - "experienceMatch" reflects how closely the candidate’s past roles, responsibilities, and achievements align with the scope, seniority, and industry of the job listing.
      - "growthPotential" measures the candidate’s capacity to succeed and adapt in this role based on trajectory, transferable strengths, and learnability.
      The "overallScore" should represent a comprehensive, high-level synthesis of all these factors — a weighted, human-like judgment of fit that correlates with the sub-scores, giving slightly more weight to skillsMatch and experienceMatch, but not a strict arithmetic average.
      
      Return nothing except the JSON object — no prose, no preamble, no markdown formatting.

      Your "summary" field should be a cohesive narrative of 3–5 paragraphs that synthesizes technical strengths, growth areas, and overall trajectory — similar in tone and depth to a professional career review.
      {
        "overallScore": number,
        "skillsMatch": number,
        "experienceMatch": number,
        "growthPotential": number,
        "strengths": string[],
        "weaknesses": string[],
        "recommendations": string[],
        "summary": string,
        "insights": {
          "skills": { 
            "narrative": string, "keywordsMatch": { 
              "matched": string[], "missing": string[] 
            } 
          },
          "experience": string,
          "growth": string
        }
      }

      Resume:
      ${resumeText}

      Job Listing:
      Title: ${title || "Not specified"}
      Company: ${company || "Not specified"}
      Location: ${location || "Not specified"}
      Description:${description || ""}
    `;

    const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
    console.log(`🤖 Running final analysis using model: ${MODEL}`);

    const completion = await openai.chat.completions.create({
      model: MODEL,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are a precise hiring analyst. Output only valid, parseable JSON — no explanations, no markdown, no extra text.",
        },
        { role: "user", content: prompt },
      ],
    });

    const text = completion.choices[0]?.message?.content || "{}";
    let analysis;
    try {
      analysis = JSON.parse(text);
    } catch (e) {
      console.warn("⚠️ Failed to parse OpenAI response, raw output:", text);
      analysis = { error: "Invalid JSON from model", rawOutput: text };
    }

    return NextResponse.json({ success: true, analysis });
  } catch (err: any) {
    console.error("Error in final-analyze route:", err);
    return NextResponse.json(
      { error: "Failed to process analysis", details: err.message },
      { status: 500 }
    );
  }
};
