import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const POST = async (req: Request) => {
  try {
    console.log("📩 /api/job-analyze hit");

    const { jobTitle, company, description } = await req.json();

    if (!jobTitle || !description) {
      return NextResponse.json(
        { error: "Missing required fields: jobTitle or description" },
        { status: 400 }
      );
    }

    // ✅ Clean and normalize job data
    const cleanedDescription = description.replace(/\s+/g, " ").trim();

    // ✅ Return clean data for use in /api/final-analyze
    return NextResponse.json({
      success: true,
      jobData: {
        title: jobTitle,
        company: company || "Not specified",
        description: cleanedDescription,
      },
    });
  } catch (err: any) {
    console.error("💥 Error in /api/job-analyze:", err);
    return NextResponse.json(
      {
        error: "Failed to process job listing",
        details: err?.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
};
