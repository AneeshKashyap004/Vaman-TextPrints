/**
 * Textile wave mark — matches `public/favicon.svg` wave geometry (stroke-only variant for navbar).
 */
export function WaveLogoMark({ className, strokeWidth = 2.25 }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      shapeRendering="geometricPrecision"
    >
      <path
        d="M4 32c6-4 12-2 16 2s10 6 16 2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M4 24c6-4 12-2 16 2s10 6 16 2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M4 16c6-4 12-2 16 2s10 6 16 2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M4 8c6-4 12-2 16 2s10 6 16 2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
