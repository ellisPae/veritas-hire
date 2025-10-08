import { NextResponse } from "next/server";
import mammoth from "mammoth";
import PDFParser from "pdf2json";
import { openai } from "@/lib/openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("📩 /api/analyze hit");

    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let text = "";

    // ✅ Handle PDF
    if (file.type.includes("pdf") || file.name.endsWith(".pdf")) {
      console.log("📄 Parsing PDF...");
      text = await new Promise<string>((resolve, reject) => {
        const pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", (errData: any) =>
          reject(errData.parserError)
        );
        pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
          const content = pdfData.Pages.map((page: any) =>
            page.Texts.map((t: any) =>
              decodeURIComponent(t.R.map((r: any) => r.T).join(" "))
            ).join(" ")
          ).join("\n");
          resolve(content);
        });
        pdfParser.parseBuffer(buffer);
      });
    }

    // ✅ Handle DOCX
    else if (file.type.includes("word") || file.name.endsWith(".docx")) {
      console.log("📄 Parsing DOCX...");
      const parsed = await mammoth.extractRawText({ buffer });
      text = parsed.value;
    } else {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}` },
        { status: 400 }
      );
    }

    if (!text.trim()) throw new Error("No text extracted");

    const cleanedText = text.replace(/\s+/g, " ").trim();
    console.log("✅ Extracted text preview:", cleanedText.substring(0, 200));

    // 🧠 --- Send to OpenAI for analysis ---
    const prompt = `
    Analyze the following resume and return a JSON object with:
    {
      "overallScore": number,
      "strengths": string[],
      "weaknesses": string[],
      "summary": string
    }

    Resume:
    ${cleanedText.substring(0, 2500)}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a resume analyst. Respond only with valid JSON (no markdown, no code fences).",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    let raw = completion.choices[0].message?.content ?? "{}";

    // 🧹 Remove markdown code fences if present
    raw = raw.replace(/```json|```/g, "").trim();

    let analysis;
    try {
      analysis = JSON.parse(raw);
    } catch (err) {
      console.error("⚠️ Failed to parse model response:", raw);
      throw new Error("Invalid JSON returned by OpenAI");
    }

    console.log("✅ Analysis completed successfully");
    return NextResponse.json({
      success: true,
      rawText: cleanedText.substring(0, 1000),
      analysis,
    });
  } catch (err: any) {
    console.error("💥 Error in /api/analyze:", err);
    return NextResponse.json(
      {
        error: "Failed to analyze resume",
        details: err.message || String(err),
      },
      { status: 500 }
    );
  }
}
