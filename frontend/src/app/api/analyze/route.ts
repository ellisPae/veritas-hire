// import { NextResponse } from "next/server";
// import pdfParse from "pdf-parse";
// import mammoth from "mammoth";
// import { mockAnalysis } from "@/lib/mockAnalysis"; // your mock file

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     console.log("📩 /api/analyze hit");

//     const formData = await req.formData();
//     const file = formData.get("resume") as File | null;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     console.log("✅ File received:", {
//       name: file.name,
//       type: file.type,
//       size: file.size,
//     });

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     if (!buffer || buffer.length === 0) {
//       throw new Error("Empty buffer received from file");
//     }

//     let text = "";

//     if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
//       console.log("📄 Parsing PDF...");
//       const parsed = await pdfParse(buffer);
//       text = parsed.text;
//     } else if (
//       file.type ===
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
//       file.name.endsWith(".docx")
//     ) {
//       console.log("📄 Parsing DOCX...");
//       const parsed = await mammoth.extractRawText({ buffer });
//       text = parsed.value;
//     } else {
//       return NextResponse.json(
//         { error: `Unsupported file type: ${file.type}` },
//         { status: 400 }
//       );
//     }

//     console.log("📝 Extracted text preview:", text.substring(0, 100));

//     // Return parsed resume + mock analysis
//     return NextResponse.json({
//       success: true,
//       rawText: text.substring(0, 1000),
//       analysis: mockAnalysis,
//     });
//   } catch (err: any) {
//     console.error("💥 Error in /api/analyze:", err);

//     return NextResponse.json(
//       {
//         error: "Failed to analyze resume",
//         details: err?.message || String(err),
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { mockAnalysis } from "@/lib/mockAnalysis";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("📩 /api/analyze hit");

    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("✅ File received:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Temporarily skip parsing
    // const arrayBuffer = await file.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);
    // const parsed = await pdfParse(buffer);
    // const text = parsed.text;

    console.log("🧪 Mock parse successful!");

    return NextResponse.json({
      success: true,
      rawText: `Parsed ${file.name} successfully (mock).`,
      analysis: mockAnalysis,
    });
  } catch (err: any) {
    console.error("💥 Error in /api/analyze:", err);

    return NextResponse.json(
      {
        error: "Failed to analyze resume",
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}
