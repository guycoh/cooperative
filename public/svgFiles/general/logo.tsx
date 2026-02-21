"use client"

type LogoProps = {
  size?: number // רוחב הלוגו
  strokeColor?: string // צבע האות C
  bodyColor?: string   // צבע גוף הדמויות
  headColor?: string   // צבע הראש של הדמויות
  className?: string
}

export default function Logo({
  size = 64,
  strokeColor = "#16a34a",
  bodyColor = "#34d399",
  headColor = "#065f46",
  className
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* האות C */}
      <path
        d="M80 20 A40 40 0 1 0 80 100"
        fill="none"
        stroke={strokeColor}
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* דמות שמאל */}
      <circle cx="58" cy="48" r="6" fill={headColor} />
      <rect x="52" y="54" width="12" height="18" rx="6" fill={bodyColor} />

      {/* דמות ימין */}
      <circle cx="78" cy="48" r="6" fill={headColor} />
      <rect x="72" y="54" width="12" height="18" rx="6" fill={bodyColor} />
    </svg>
  )
}