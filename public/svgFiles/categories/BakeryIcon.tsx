type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function BakeryIcon({
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
        d="M4 14C4 10 8 7 12 7C16 7 20 10 20 14V17H4V14Z"
        stroke={color}
        strokeWidth="1.8"
      />
      <path
        d="M7 14V12M12 14V11M17 14V12"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
