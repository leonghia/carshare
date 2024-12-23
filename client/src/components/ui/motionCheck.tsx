import React from "react";
import { motion } from "motion/react";

interface Props extends React.RefAttributes<SVGSVGElement> {}

const MotionCheck = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.2,
          type: "tween",
        }}
        // d="M20 6 9 17l-5-5"
        d="M4 12 9 17 l11 -11"
      />
    </svg>
  );
});

MotionCheck.displayName = "MotionCheck";

export { MotionCheck };
