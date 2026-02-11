type LocalSupplierStampProps = {
  size?: number
  color?: string
  className?: string
}

export default function LocalSupplierStamp({
  size = 96,
  color = "#15803d", // ירוק רשמי לבאדג'ים
  className = "",
}: LocalSupplierStampProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ספק מקומי"
    >
      {/* רקע לבן פנימי */}
      <circle
        cx="100"
        cy="100"
        r="82"
        fill="#ffffff"
      />

      {/* עיגול חיצוני */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke={color}
        strokeWidth="10"
      />

      {/* עיגול פנימי מקווקו */}
      <circle
        cx="100"
        cy="100"
        r="66"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray="6 6"
      />

      {/* טקסט – מוגדל */}
      <text
        x="100"
        y="94"
        textAnchor="middle"
        fontSize="34"
        fontWeight="900"
        fill={color}
      >
        ספק
      </text>

      <text
        x="100"
        y="132"
        textAnchor="middle"
        fontSize="34"
        fontWeight="900"
        fill={color}
      >
        מקומי
      </text>

      {/* קווים צדדיים קטנים */}
      <line
        x1="34"
        y1="100"
        x2="54"
        y2="100"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="146"
        y1="100"
        x2="166"
        y2="100"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}
