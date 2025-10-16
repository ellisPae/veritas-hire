import { NextResponse } from "next/server";
import mammoth from "mammoth";
import PDFParser from "pdf2json";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("📩 /api/resume-analyze hit");

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
      console.log("📄 Parsing PDF with pdf2json...");
      text = await new Promise<string>((resolve, reject) => {
        const pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", (errData: any) => {
          console.error("❌ PDF parsing error:", errData.parserError);
          reject(errData.parserError);
        });

        pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
          const content = pdfData.Pages.map((page: any) =>
            page.Texts.map((t: any) => {
              try {
                return decodeURIComponent(t.R.map((r: any) => r.T).join(""));
              } catch {
                return t.R.map((r: any) => r.T).join("");
              }
            }).join(" ")
          ).join("\n");

          resolve(content);
        });

        pdfParser.parseBuffer(buffer);
      });

      // ✅ Clean and normalize extracted text
      text = text
        .replace(/[^\S\r\n]+/g, " ")
        .replace(/\n{2,}/g, "\n")
        .trim();
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

    console.log("✅ Extracted text length:", text.length);
    return NextResponse.json({
      success: true,
      resumeText: text,
    });
  } catch (err: any) {
    console.error("💥 Error in /api/resume-analyze:", err);
    return NextResponse.json(
      {
        error: "Failed to process resume",
        details: err.message || String(err),
      },
      { status: 500 }
    );
  }
}
