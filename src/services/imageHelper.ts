import React from 'react';

/**
 * Generates a beautiful dynamic SVG placeholder base64 URI for a course card.
 * Uses the Kalandula brand colors (linear gradient from orange to dark slate).
 */
export function getFallbackImage(courseTitle: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF6B35"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#g)"/>
  
  <!-- Grid pattern overlay for a premium tech feel -->
  <svg opacity="0.07">
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1"/>
    </pattern>
    <rect width="800" height="450" fill="url(#grid)" />
  </svg>

  <g transform="translate(400, 205)">
    <!-- Title -->
    <text text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" letter-spacing="-0.5">${courseTitle}</text>
  </g>
  
  <g transform="translate(400, 260)">
    <!-- Subtitle/Brand -->
    <text text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" letter-spacing="1.5">KALANDULA LEARNING</text>
  </g>
</svg>`;

  try {
    // Safely encode Unicode characters into base64 string
    const utf8Bytes = encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    });
    const base64 = btoa(utf8Bytes);
    return `data:image/svg+xml;base64,${base64}`;
  } catch (error) {
    console.error('Failed to generate base64 SVG fallback:', error);
    // Simple URL-encoded fallback as fallback to fallback
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill="%231E293B"/><text x="50%" y="50%" fill="white" text-anchor="middle" font-weight="bold">${encodeURIComponent(courseTitle)}</text></svg>`;
  }
}

/**
 * Image onError handler to dynamically replace a broken image src with a clean brand placeholder.
 * Prevents infinite loops by checking if the source is already the fallback.
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, courseTitle: string): void {
  const img = e.currentTarget;
  const fallback = getFallbackImage(courseTitle);
  if (img.src !== fallback) {
    img.src = fallback;
  }
}
