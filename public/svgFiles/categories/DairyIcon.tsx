type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function DairyAndEggsIcon({
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
      {/* Bottle */}
      <path
        d="M9 3H11V6C11 6.6 10.6 7 10 7C9.4 7 9 6.6 9 6V3Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 7H12C13.1 7 14 7.9 14 9V19C14 20.1 13.1 21 12 21H8C6.9 21 6 20.1 6 19V9C6 7.9 6.9 7 8 7Z"
        stroke={color}
        strokeWidth="1.8"
      />

      {/* Egg */}
      <path
        d="M17 14C17 17 15.5 19 14 19C12.5 19 11 17 11 14C11 11.5 12.5 9 14 9C15.5 9 17 11.5 17 14Z"
        stroke={color}
        strokeWidth="1.8"
      />
    </svg>
  );
}
