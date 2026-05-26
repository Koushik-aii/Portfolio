import type { ReactNode } from "react";
import { profile } from "@/data/profile";

type SocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
  isExternal?: boolean;
};

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.15-4.56-5.09 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.36 1.9-1.33 2.75-1.05 2.75-1.05.54 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.83-4.57 5.08.36.32.68.94.68 1.9 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M7 9H4v11h3V9ZM5.5 4.5A1.75 1.75 0 1 0 5.5 8a1.75 1.75 0 0 0 0-3.5ZM20 20h-3v-5.64c0-1.6-.57-2.69-2-2.69-1.09 0-1.74.76-2.03 1.5-.1.27-.13.64-.13 1.01V20h-3s.04-9.73 0-10.74h3v1.52c.4-.7 1.11-1.7 2.7-1.7 1.97 0 3.46 1.33 3.46 4.18V20Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M21 12.3c0 2.3-.27 3.84-.62 4.8-.19.54-.61.97-1.13 1.18-.94.38-2.84.62-7.25.62s-6.31-.24-7.25-.62a1.93 1.93 0 0 1-1.13-1.18C3.27 16.14 3 14.6 3 12.3s.27-3.84.62-4.8c.19-.54.61-.97 1.13-1.18.94-.38 2.84-.62 7.25-.62s6.31.24 7.25.62c.52.21.94.64 1.13 1.18.35.96.62 2.5.62 4.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 7.5h16v9H4v-9Zm0 0 8 6 8-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function SocialSidebar() {
  const links: SocialLink[] = [
    {
      label: "GitHub",
      href: profile.githubUrl,
      icon: <GitHubIcon />,
      isExternal: true,
    },
    {
      label: "LinkedIn",
      href: profile.linkedinUrl,
      icon: <LinkedInIcon />,
      isExternal: true,
    },
    ...(profile.youtubeUrl
      ? [
          {
            label: "YouTube",
            href: profile.youtubeUrl,
            icon: <YouTubeIcon />,
            isExternal: true,
          } satisfies SocialLink,
        ]
      : []),
    {
      label: "Email",
      href: `mailto:${profile.email}`,
      icon: <MailIcon />,
      isExternal: false,
    },
  ];

  return (
    <aside className="fixed bottom-0 left-8 z-40 hidden items-center md:flex md:flex-col md:gap-5">
      {links.map((link) => (
        <a
          key={link.label}
          aria-label={link.label}
          className="text-[#a1a1aa] transition duration-200 hover:-translate-y-1 hover:text-[#c4b5fd]"
          href={link.href}
          rel={link.isExternal ? "noreferrer" : undefined}
          target={link.isExternal ? "_blank" : undefined}
        >
          {link.icon}
        </a>
      ))}
      <span className="mt-2 h-28 w-px bg-gradient-to-b from-[rgba(255,255,255,0.10)] to-transparent lg:h-36" />
    </aside>
  );
}
