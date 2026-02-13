type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function CleaningIcon({
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
      {/* Bottle body */}
      <path
        d="M9 9C9 8.44772 9.44772 8 10 8H14C14.5523 8 15 8.44772 15 9V20C15 20.5523 14.5523 21 14 21H10C9.44772 21 9 20.5523 9 20V9Z"
        stroke={color}
        strokeWidth="1.8"
      />

      {/* Bottle neck */}
      <path
        d="M10 4H14V8H10V4Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Spray head */}
      <path
        d="M14 4H17L18 6H14"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bubbles */}
      <circle cx="6" cy="10" r="1" fill={color} />
      <circle cx="5" cy="14" r="0.8" fill={color} />
      <circle cx="7" cy="13" r="0.7" fill={color} />
    </svg>
  );
}
