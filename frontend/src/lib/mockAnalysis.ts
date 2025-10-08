import { AnalysisResultsProps } from "@/types/analysis";

export const mockAnalysis: AnalysisResultsProps = {
  overallScore: 82,
  skillsMatch: 85,
  experienceMatch: 72,
  growthPotential: 78,
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
    skills: {
      narrative: `
        Your technical strengths are firmly rooted in modern frontend engineering. You demonstrate strong
        fluency in React, TypeScript, and component-driven design patterns, supported by a solid grasp of
        responsive layouts, accessibility best practices, and automated testing. These foundations make you
        an immediately valuable contributor to teams building user-focused applications at scale.

        Beyond individual features, your skills in working with design systems, integrating APIs, and
        maintaining consistency across codebases highlight a thoughtful and methodical engineering style.
        You’ve also shown capability in leveraging CI/CD pipelines and agile practices, underscoring your
        readiness to work effectively in fast-moving, iterative environments.

        To strengthen your technical portfolio further, the most impactful next step would be broadening
        into backend and infrastructure competencies. Gaining proficiency with Node.js or Python for
        server-side development, experimenting with Dockerized workflows, and deploying services on AWS
        would extend your impact across the stack. By pairing your proven frontend mastery with cross-stack
        fluency, you would not only increase your versatility but also position yourself as a candidate
        capable of owning entire product lifecycles from ideation to deployment.
      `,
      keywordsMatch: {
        matched: ["React.js", "TypeScript", "Agile", "CI/CD"],
        missing: ["AWS", "Node.js", "Docker"],
      },
    },
    experience: `
      Your professional track record demonstrates consistent delivery in agile environments, where you’ve
      partnered effectively with designers, product managers, and fellow engineers to ship polished features.
      You show strength in communication and collaboration, and you’ve worked on projects with clear user
      impact and measurable value.

      Where your experience could deepen is in broader systems exposure. Hands-on involvement with backend
      architecture, database optimization, or distributed system design is currently less emphasized. Adding
      evidence of these skills—whether through contributions to APIs, scaling efforts, or infrastructure
      improvements—will strengthen your profile and demonstrate readiness for more complex engineering
      challenges.

      Employers will also be looking for signs of ownership beyond individual tickets. Highlighting leadership
      in sprint planning, mentoring junior developers, or driving process improvements would reinforce your
      credibility as someone who elevates not just code, but teams.
    `,
    growth: `
          Growth potential is one of your standout qualities. You’ve shown a clear appetite for learning new
          technologies and adapting quickly to shifting requirements, which suggests resilience and strong long-term
          value to employers. Your rapid uptake of tools like React, TypeScript, and CI/CD pipelines already
          signals adaptability; the next step is to turn that adaptability into thought leadership.

          A focused plan of action could accelerate your trajectory. Setting specific milestones—deploying a
          personal project to AWS, contributing to an open-source library, or writing technical articles about
          lessons learned—will create tangible proof of your growth. Each milestone compounds: not only will
          you build technical depth, but you’ll also create a visible narrative of initiative and continuous
          development.

          Taken together, these steps would present you as someone not just keeping pace with technology, but
          actively shaping your own path forward. That story resonates powerfully with employers seeking
          engineers who can grow into leadership and bring fresh perspectives to their teams.
        `,
  },
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
};
