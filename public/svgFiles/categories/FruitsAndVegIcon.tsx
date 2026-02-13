type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function FruitsAndVegIcon({
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
      <path
        d="M12 3C8 3 5 7 5 11C5 15 8 19 12 19C16 19 19 15 19 11C19 7 16 3 12 3Z"
        stroke={color}
        strokeWidth="1.8"
      />
      <path
        d="M12 3V1M12 19V23"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
