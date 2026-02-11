type LocalSupplierBadgeProps = {
  size?: number
  color?: string
  className?: string
}


export default function LocalSupplierCup({
  size = 200,
  color = "#2e8b57", // ברירת מחדל – כתום Morgi
  className = "",
}: LocalSupplierBadgeProps) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ספק מקומי"
    >
      <defs>
        <linearGradient id="cupGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>

        <filter id="softShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* יד שמאל */}
      <path
        d="M25 70 C5 70 5 120 40 120"
        fill="none"
        stroke={color}
        strokeWidth="10"
      />

      {/* יד ימין */}
      <path
        d="M175 70 C195 70 195 120 160 120"
        fill="none"
        stroke={color}
        strokeWidth="10"
      />

      {/* גוף הגביע */}
      <path
        d="M50 30 H150 V95 C150 135 120 155 100 160 C80 155 50 135 50 95 Z"
        fill="url(#cupGradient)"
        filter="url(#softShadow)"
      />

      {/* טקסט */}
      <text
        x="100"
        y="95"
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fill="#ffffff"
        style={{ letterSpacing: "0.5px" }}
      >
        ספק מקומי
      </text>

      {/* רגל */}
      <rect x="85" y="160" width="30" height="22" rx="6" fill={color} />

      {/* בסיס */}
      <rect x="60" y="182" width="80" height="18" rx="8" fill={color} />
    </svg>
  )
}












// type LocalSupplierBadgeProps = {
//   size?: number
//   className?: string
//   cupColor?: string
//   baseColor?: string
//   textColor?: string
// }

// export default function LocalSupplierBadge({
//   size = 200,
//   className = "",
//   cupColor = "#f59e0b",     // זהב
//   baseColor = "#92400e",    // חום כהה
//   textColor = "#ffffff",
// }: LocalSupplierBadgeProps) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 200 220"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//       role="img"
//       aria-label="ספק מקומי"
//     >
//       <defs>
//         <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#fde68a" />
//           <stop offset="100%" stopColor={cupColor} />
//         </linearGradient>

//         <filter id="shadow">
//           <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.25" />
//         </filter>
//       </defs>

//       {/* יד שמאל */}
//       <path
//         d="M25 70 C5 70 5 120 40 120"
//         fill="none"
//         stroke={cupColor}
//         strokeWidth="10"
//       />

//       {/* יד ימין */}
//       <path
//         d="M175 70 C195 70 195 120 160 120"
//         fill="none"
//         stroke={cupColor}
//         strokeWidth="10"
//       />

//       {/* גוף הגביע */}
//       <path
//         d="M50 30 H150 V95 C150 135 120 155 100 160 C80 155 50 135 50 95 Z"
//         fill="url(#goldGradient)"
//         filter="url(#shadow)"
//       />

//       {/* טקסט */}
//       <text
//         x="100"
//         y="95"
//         textAnchor="middle"
//         fontSize="20"
//         fontWeight="800"
//         fill={textColor}
//       >
//         ספק מקומי
//       </text>

//       {/* רגל */}
//       <rect x="85" y="160" width="30" height="22" rx="6" fill={baseColor} />

//       {/* בסיס */}
//       <rect x="60" y="182" width="80" height="18" rx="8" fill={baseColor} />
//     </svg>
//   )
// }










// type LocalSupplierBadgeProps = {
//   width?: number
//   height?: number
//   className?: string
//   primaryColor?: string
//   secondaryColor?: string
//   textColor?: string
// }

// export default function LocalSupplierBadge({
//   width = 220,
//   height = 70,
//   className = "",
//   primaryColor = "#f97316",   // כתום
//   secondaryColor = "#fdba74", // כתום בהיר
//   textColor = "#ffffff",
// }: LocalSupplierBadgeProps) {
//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox="0 0 220 70"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//       role="img"
//       aria-label="ספק מקומי"
//     >
//       <defs>
//         <linearGradient id="badgeGradient" x1="0" y1="0" x2="1" y2="1">
//           <stop offset="0%" stopColor={primaryColor} />
//           <stop offset="100%" stopColor={secondaryColor} />
//         </linearGradient>

//         <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
//           <feDropShadow
//             dx="0"
//             dy="3"
//             stdDeviation="6"
//             floodColor="#000"
//             floodOpacity="0.2"
//           />
//         </filter>
//       </defs>

//       {/* רקע */}
//       <rect
//         x="5"
//         y="5"
//         rx="22"
//         ry="22"
//         width="210"
//         height="60"
//         fill="url(#badgeGradient)"
//         filter="url(#softShadow)"
//       />

//       {/* מסגרת */}
//       <rect
//         x="5"
//         y="5"
//         rx="22"
//         ry="22"
//         width="210"
//         height="60"
//         fill="none"
//         stroke="rgba(255,255,255,0.35)"
//         strokeWidth="1.5"
//       />

//       {/* טקסט */}
//       <text
//         x="110"
//         y="44"
//         textAnchor="middle"
//         fontSize="26"
//         fontWeight="700"
//         fill={textColor}
//         style={{ letterSpacing: "0.5px" }}
//       >
//         ספק מקומי
//       </text>
//     </svg>
//   )
// }
