import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { getLogoSvg } from '../src/data/logo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

async function generateFavicons() {
  console.log('Generating favicons from single source of truth...');

  // 1. Get raw SVG string
  // To avoid clipping in the square icon, we scale it up keeping aspect ratio
  // The original logo is 28x32. We'll render it inside a 256x256 square viewbox 
  // so it looks perfectly centered in square icons.
  
  const squareSvg = `
    <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C6FF00" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <g transform="translate(114, 112) scale(7) translate(-14, -16)">
        <path d="M22 9C22 6.8 20 5 17.5 5H12C9.5 5 7.5 6.8 7.5 9C7.5 11.2 9.5 13 12 13H16C18.5 13 20.5 14.8 20.5 17C20.5 19.2 18.5 21 16 21H10.5C8 21 6 19.2 6 17" stroke="url(#logoGrad)" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="22" cy="26" r="2.5" fill="#C6FF00" opacity="0.8" />
      </g>
    </svg>
  `;

  const svgBuffer = Buffer.from(squareSvg);

  // Generate PNGs
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);

  // Generate favicon.ico (must contain 16, 32, 48)
  const icoBuffer = await pngToIco([png16, png32, png48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  // Clean up old stuff
  try { fs.unlinkSync(path.join(publicDir, 's-favicon.svg')); } catch (e) {}
  
  console.log('✅ Favicons generated successfully.');
}

generateFavicons().catch(err => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});
