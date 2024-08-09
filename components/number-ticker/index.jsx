"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          latest.toFixed(0),
        );
      }
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span
      className={cn(
        "inline-block tabular-nums text-6xl text-black dark:text-white tracking-wider",
        className
      )}
      ref={ref}
    />
  );
}