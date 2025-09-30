"use client";

import AnalysisResults from "@/components/AnalysisResults";
import type { AnalysisResultsProps } from "@/types/analysis";

export default function ResultsPage() {
  const data: AnalysisResultsProps = {
    overallScore: 82,
    skillsMatch: 85,
    experienceMatch: 72,
    growthPotential: 78,
    summary: `
      This profile tells a story of a capable frontend engineer with strong fundamentals,
      proven delivery, and clear signs of upward trajectory. The technical toolkit is
      anchored in React.js, TypeScript, and modern UI best practices, reinforced by
      production-level experience across multiple projects. This foundation establishes
      both credibility and reliability in environments that demand consistent delivery
      and team collaboration.

      Beyond technical proficiency, the individual demonstrates an adaptability that
      employers value highly. Past work highlights the ability to quickly absorb new
      frameworks, integrate feedback, and contribute meaningfully in agile settings.
      This adaptability reduces ramp-up time and signals readiness for environments
      where priorities and technologies evolve rapidly.

      At the same time, the analysis surfaces opportunities for targeted growth. Backend
      exposure and cloud deployment skills remain underdeveloped, which limits the
      ability to fully own end-to-end feature delivery. Addressing this gap by engaging
      with Node.js, cloud-native services, or distributed systems would broaden the
      profile and elevate perceived versatility. Expanding measurable outcomes—such as
      revenue impact, performance gains, or user adoption—will also strengthen the
      narrative by demonstrating tangible results alongside technical capability.

      Taken as a whole, the resume presents a professional who is already contributing
      effectively but has the potential to step into broader ownership. The trajectory
      suggests readiness to evolve from a strong contributor into a senior-level engineer
      who not only builds, but also leads and influences. Employers viewing this profile
      can interpret it as low-risk, high-upside: the individual is dependable in the
      present and poised to create greater value in the near future if given the runway
      to grow.
    `,
    strengths: [
      "Proficient in React.js and TypeScript with multiple production-level projects",
      "Strong collaboration in agile team environments",
      "Quick learner with demonstrated adaptability to new technologies",
    ],
    weaknesses: [
      "Limited backend experience with complex API systems",
      "Minimal exposure to cloud-native deployment environments",
      "Some resume entries lack clear, measurable outcomes",
    ],
    recommendations: [
      "Add small backend and cloud projects to demonstrate versatility.",
      "Include measurable results for past work (performance gains, reliability improvements).",
      "Showcase leadership moments (mentoring, code reviews, sprint ownership).",
      "Refine resume keywords to better mirror target job descriptions.",
    ],
    insights: {
      skills: `
        Your strongest signals come from modern frontend engineering—React, TypeScript, component
        architecture, and testing. To widen impact, build fluency in backend services (Node.js or Python)
        and cloud tooling (AWS) so you can confidently contribute across the stack and lead end-to-end work.
      `,
      experience: `
        You’ve shipped features consistently in agile settings and collaborate well across design and product.
        Depth with distributed systems and production backend patterns is lighter. Highlight any service work,
        deployment ownership, or CI/CD involvement to present a more balanced profile.
      `,
      growth: `
        Curiosity and velocity are clear: you adopt new tools quickly and iterate thoughtfully. Codify that
        momentum with concrete milestones—publish a small service, deploy to AWS, write a short technical
        post—to convert potential into visible, compounding outcomes.
      `,
    },
  };

  return <AnalysisResults {...data} />;
}
