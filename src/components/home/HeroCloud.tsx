import { motion, type ValueTransition } from "framer-motion";
import cloud from "@/assets/cloud.png";

export default function HeroCloud() {
  const transitionValues: ValueTransition = {
    duration: 10,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  };

  return (
    <motion.div
      transition={{
        x: transitionValues,
        y: transitionValues,
      }}
      animate={{
        x: ["-2rem", "2rem", "-2rem"],
        y: ["0rem", "0.5rem", "0rem", "0.5rem", "0rem", "0.5rem", "0rem"],
      }}
    >
      <img src={cloud.src} alt="" className="-z-50 absolute inset-x-0" loading="lazy" />
    </motion.div>
  );
}
