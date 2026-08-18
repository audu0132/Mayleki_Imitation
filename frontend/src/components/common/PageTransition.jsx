import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(6px)",
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(6px)",
    y: -20,
  },
};

const pageTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
};

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
