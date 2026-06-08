export const logoSvgContent = `
<defs>
  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="#C6FF00" />
    <stop offset="100%" stopColor="#8B5CF6" />
  </linearGradient>
</defs>
<path d="M22 9C22 6.8 20 5 17.5 5H12C9.5 5 7.5 6.8 7.5 9C7.5 11.2 9.5 13 12 13H16C18.5 13 20.5 14.8 20.5 17C20.5 19.2 18.5 21 16 21H10.5C8 21 6 19.2 6 17" stroke="url(#logoGrad)" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="22" cy="26" r="2.5" fill="#C6FF00" opacity="0.8" />
`;

export const getLogoSvg = (width = 28, height = 32) => `<svg width="${width}" height="${height}" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${logoSvgContent}</svg>`;
