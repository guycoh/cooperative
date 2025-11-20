

type BadgeProps = {
  text?: string;
  size?: number; // רוחב/גובה SVG
  className?: string;
};

export const SeparateDeliveryBadge: React.FC<BadgeProps> = ({
  text = "אספקה בנפרד",
  size = 80,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={30}
      viewBox="0 0 80 30"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="80"
        height="30"
        rx="6"
        ry="6"
        fill="#7C3AED" // סגול
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        {text}
      </text>
    </svg>
  );
};
