type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function BabyProductsIcon({
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
        d="M10 5H14V18C14 19.1 13.1 20 12 20C10.9 20 10 19.1 10 18V5Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Bottle nipple */}
      <path
        d="M11 3H13V5H11V3Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Pacifier */}
      <circle cx="18" cy="15" r="3" stroke={color} strokeWidth="1.8" />
      <path
        d="M16.5 15H19.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18 13.5V16.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
