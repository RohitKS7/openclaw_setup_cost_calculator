"use client";

import { motion } from "framer-motion";

interface MotionSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function MotionSection({ children, delay = 0, className }: MotionSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}

