"use client";

import type React from "react";
import { motion } from "framer-motion";

type AnimatedStepProps = {
  children: React.ReactNode;
};

export const AnimatedStep = ({ children }: AnimatedStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);
