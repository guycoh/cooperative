type LocalSupplierDocumentProps = {
  size?: number
  color?: string
  className?: string
}

export default function LocalSupplierDocument({
  size = 180,
  color = "#15803d", // ירוק מומלץ לבאדג' על תמונה
  className = "",
}: LocalSupplierDocumentProps) {
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 200 250"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ספק מקומי"
    >
      {/* מסגרת מסמך */}
      <rect
        x="20"
        y="20"
        width="160"
        height="210"
        rx="12"
        fill="none"
        stroke={color}
        strokeWidth="8"
      />

      {/* פינה מקופלת */}
      <path
        d="M140 20 L180 20 L180 60 Z"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinejoin="round"
      />

      {/* קו עליון */}
      <line
        x1="45"
        y1="80"
        x2="155"
        y2="80"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* טקסט – גדול וברור */}
      <text
        x="100"
        y="138"
        textAnchor="middle"
        fontSize="32"
        fontWeight="900"
        fill={color}
      >
        <tspan x="100" dy="0">ספק</tspan>
        <tspan x="100" dy="36">מקומי</tspan>
      </text>

      {/* קו תחתון */}
      <line
        x1="60"
        y1="200"
        x2="140"
        y2="200"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}
