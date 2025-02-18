'use client'
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface FadeInWrapperProps {
  children: React.ReactNode;
  delay?: number;        // Delay before animation starts (in seconds)
  duration?: number;     // Animation duration (in seconds)
  threshold?: number;    // How much of the element needs to be in view (0-1)
  direction?: "up" | "down" | "left" | "right"; // Direction to fade in from
  distance?: number;     // Distance to travel in pixels
  className?: string;
}

const FadeInWrapper = ({
  children,
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
  direction = "up",
  distance = 50,
  className = "",
}: FadeInWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: true }); // Added once: true
  
  // Define initial and animate positions based on direction
  const getDirectionalProperties = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...getDirectionalProperties(),
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : getDirectionalProperties().y,
        x: isInView ? 0 : getDirectionalProperties().x,
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWrapper;