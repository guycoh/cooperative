type MeatAndFishIconProps = {
  size?: number | string;
  color?: string;
  className?: string;
};

export default function MeatAndFishIcon({
  size = 28,
  color = "currentColor",
  className = "",
}: MeatAndFishIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* דג */}
      <path
        d="M3 12C5 8 9 7 12 9C15 11 19 10 21 8C20 12 17 16 12 15C7 14 5 16 3 12Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* עין דג */}
      <circle cx="11" cy="10" r="0.8" fill={color} />

      {/* בשר */}
      <path
        d="M6 17C6 15 8 14 10 14C13 14 15 15 15 17C15 19 13 20 10 20C8 20 6 19 6 17Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* עצם */}
      <circle cx="10" cy="17" r="1.2" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}
