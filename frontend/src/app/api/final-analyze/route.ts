import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("📩 /api/final-analyze hit");

    const { resumeText, jobListing } = await req.json();

    if (!resumeText || !jobListing?.description) {
      return NextResponse.json(
        { error: "Missing resume or job listing data" },
        { status: 400 }
      );
    }

    const prompt = `
      You are an experienced technical hiring manager and career analyst.
      Compare the candidate's resume against the job listing and return a structured JSON object in this exact format:
      {
        "overallScore": number, // overall fit 0–100
        "skillsMatch": number, // technical match 0–100
        "experienceMatch": number, // experience alignment 0–100
        "growthPotential": number, // long-term growth potential 0–100
        "strengths": string[], // concise strengths
        "weaknesses": string[], // clear improvement areas
        "recommendations": string[], // actionable improvement steps
        "insights": {
          "skills": {
            "narrative": string, // multi-paragraph narrative about technical and soft skills
            "keywordsMatch": {
              "matched": string[], // matched keywords
              "missing": string[] // missing or low-relevance keywords
            }
          },
          "experience": string, // multi-paragraph narrative of experience
          "growth": string // multi-paragraph narrative of growth potential
        },
        "summary": string //  holistic summary, written in 3–5 distinct paragraphs (each separated by line breaks), plain text
      }
      Resume: ${resumeText}
      Job Listing:
        ${jobListing.title} at ${jobListing.company}
        ${jobListing.description}
      Make sure your JSON is valid (no markdown or extra commentary).
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are a precise technical hiring analyst. Respond only in valid JSON.",
        },
        { role: "user", content: prompt },
      ],
    });

    let raw = completion.choices[0].message?.content ?? "{}";
    raw = raw
      .replace(/```json|```/g, "")
      .replace(/^[^{]*({[\s\S]*})[\s\S]*$/, "$1")
      .trim();

    let analysis;
    try {
      analysis = JSON.parse(raw);
    } catch (err) {
      console.error("⚠️ Failed to parse JSON:", raw);
      throw new Error("Invalid JSON returned by OpenAI");
    }

    console.log("✅ Final analysis complete");
    return NextResponse.json({ success: true, analysis });
  } catch (err: any) {
    console.error("💥 Error in /api/final-analyze:", err);
    return NextResponse.json(
      {
        error: "Failed to generate final analysis",
        details: err.message || String(err),
      },
      { status: 500 }
    );
  }
}
