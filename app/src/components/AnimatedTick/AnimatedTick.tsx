import { motion } from 'framer-motion';

const tickVariants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function AnimatedTick({
  className,
  isChecked,
}: {
  className: string;
  isChecked: boolean;
}) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={false}
      animate={isChecked ? 'checked' : 'unchecked'}
      className={className}
    >
      <motion.path d="M5 12l5 5l10 -10" variants={tickVariants} />
    </motion.svg>
  );
}
