import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("📩 /api/job-analyze hit");

    const { jobTitle, company, description } = await req.json();

    if (!jobTitle || !description) {
      return NextResponse.json(
        { error: "Missing required fields: jobTitle or description" },
        { status: 400 }
      );
    }

    const prompt = `
      You are a hiring analyst. Analyze the following job listing and summarize key details in JSON format:
      {
        "roleSummary": string, // short 1-2 sentence summary of the role
        "keySkills": string[], // top skills required
        "experienceLevel": string, // e.g. Entry, Mid, Senior
        "focusAreas": string[], // areas of work or focus
        "softSkills": string[], // e.g. communication, teamwork, adaptability
        "summary": string // concise, natural-language summary for UI display
      }

      Job Title: ${jobTitle}
      Company: ${company || "Not specified"}
      Description:
      ${description}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a precise and structured job listing analyst.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const raw = completion.choices[0].message?.content ?? "{}";

    // 🧹 Clean up markdown-style code block wrappers (```json ... ```)
    const cleaned = raw
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .trim();

    let analysis;
    try {
      analysis = JSON.parse(cleaned);
    } catch (err) {
      console.error("❌ Failed to parse JSON from OpenAI:", err);
      analysis = {
        summary: "Failed to parse AI response",
        rawOutput: cleaned,
      };
    }

    console.log("✅ Job listing analyzed successfully");
    console.log("🧠 Cleaned AI Output:", cleaned.substring(0, 200));

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (err: any) {
    console.error("💥 Error in /api/job-analyze:", err);
    return NextResponse.json(
      {
        error: "Failed to analyze job listing",
        details: err?.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
