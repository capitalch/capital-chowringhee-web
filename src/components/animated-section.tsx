"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export function AnimatedSection({
  children,
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
