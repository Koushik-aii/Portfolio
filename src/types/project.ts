export type ProjectStatus = "In Development";

export type Project = {
  name: string;
  slug: string;
  status?: ProjectStatus;
  summary: string;
  stack: string[];
  highlights: string[];
  previewImage?: string;
  githubUrl: string;
  liveUrl: string;
};
