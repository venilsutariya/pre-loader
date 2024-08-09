"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Preloader from "@/components/pre-loader";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    }, 2500);
  }, []);

  return (
    <main>
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>
      <div className="p-10">
        {"Look's amazing 😊".split(" ").map((word, index) => {
          return (
            <span
              key={index}
              className={`inline-flex relative overflow-hidden me-3 pb-2`}
            >
              {startAnimation && (
                <motion.span
                  initial={{ y: 120, scale: 0.9 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{ delay: 0.05 * index, duration: 0.5 }}
                  className={`text-4xl font-[500] tracking-tighter lg:text-6xl`}
                >
                  {word}
                </motion.span>
              )}
            </span>
          );
        })}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.5 }}
          className="py-10"
        >
          <div>
            Created by{" "}
            <Link
              href={"https://venil.vercel.app"}
              className="hover:text-blue-500 hover:underline transition-all font-[500]"
            >
              venil sutariya
            </Link>
          </div>
          <Link
            className="hover:text-blue-500 hover:underline transition-all font-[500]"
            href={"https://shilp.co"}
          >
            shilp.co
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
