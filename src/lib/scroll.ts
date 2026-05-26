/**
 * Smoothly scrolls to a section by its element ID and keeps the URL clean.
 */
export function scrollToSection(sectionId: string): void {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  // Remove any hash that might have been added
  window.history.replaceState(null, "", window.location.pathname);
}
