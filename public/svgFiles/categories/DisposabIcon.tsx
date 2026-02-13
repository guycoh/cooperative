type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function DisposableIcon({
  size = 24,
  color = "currentColor",
  className = "",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Plate */}
      <circle
        cx="9"
        cy="13"
        r="5"
        stroke={color}
        strokeWidth="1.8"
      />

      {/* Cup */}
      <path
        d="M15 4H20L18.5 21H16.5L15 4Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Cup lid line */}
      <path
        d="M15 6H20"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
