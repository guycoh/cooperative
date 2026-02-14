type Props = {
  size?: number | string;
  className?: string;
};

export default function DeliverySeparateIcon({
  size = 200,
  className = "",
}: Props) {
  return (
    <svg
      width={size}
      height={(Number(size) * 80) / 200} // יחס גובה לרוחב
      viewBox="0 0 200 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* גוף המשאית מצומצם למקסימום עבור הטקסט */}
      <rect x="10" y="25" width="170" height="35" rx="8" fill="#7C3AED" />

      {/* קבינה מינימלית ביותר */}
      <rect x="175" y="30" width="15" height="25" rx="3" fill="#5C1DA3" />

      {/* גלגלים */}
      <circle cx="30" cy="65" r="7" fill="#333333" />
      <circle cx="150" cy="65" r="7" fill="#333333" />
      <circle cx="185" cy="65" r="7" fill="#333333" />

      {/* טקסט מרכזי – תופס את כל גוף המשאית */}
      <text
        x="95"
        y="45"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="bold"
        fill="#FFFFFF"
        textAnchor="middle"
      >
        אספקה
      </text>
      <text
        x="95"
        y="60"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="bold"
        fill="#FFFFFF"
        textAnchor="middle"
      >
        נפרדת
      </text>
    </svg>
  );
}
