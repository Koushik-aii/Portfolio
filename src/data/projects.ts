import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    name: "GlobeSync",
    slug: "globesync",
    summary:
      "Travel itinerary planning and coordination platform supporting travelers, guides, administrators, and customer support workflows.",
    stack: ["NestJS", "TypeScript", "MySQL", "Swagger"],
    highlights: [
      "Trip booking and itinerary coordination workflows",
      "Package management system",
      "Payment handling workflows",
      "Support ticket management",
      "Role-based access control across multiple user roles",
      "Frontend-backend integration replacing prototype mock workflows",
    ],
    previewImage: "/projects/globesync-preview.png",
    githubUrl: "https://github.com/IIIT-Sricity-FSD-2024-2028/50_GlobeSync",
    liveUrl: "",
  },
  {
    name: "StoriX",
    slug: "storix",
    status: "In Development",
    summary:
      "Intelligent file management platform focused on scalable file handling and digital asset organization.",
    stack: ["React.js", "Redux Toolkit", "NestJS", "PostgreSQL", "Redis"],
    highlights: [
      "Chunked uploads for large file handling",
      "Resumable file transfers",
      "Metadata-driven search",
      "Access-controlled file sharing",
      "File deduplication using hashing",
      "Scalable backend file orchestration",
    ],
    githubUrl: "https://github.com/Koushik-aii/StoriX",
    liveUrl: "",
  },
  {
    name: "CodeLens",
    slug: "codelens",
    status: "In Development",
    summary:
      "AI-powered repository intelligence platform for understanding GitHub repositories faster.",
    stack: ["React.js", "Redux Toolkit", "Node.js", "GitHub API", "OpenAI API"],
    highlights: [
      "GitHub repository URL analysis",
      "AI-generated architecture summaries",
      "Codebase explanations",
      "Project structure insights",
      "Technology stack breakdown",
      "Repository metadata analysis",
    ],
    githubUrl: "https://github.com/Koushik-aii/CodeLens",
    liveUrl: "",
  },
];
