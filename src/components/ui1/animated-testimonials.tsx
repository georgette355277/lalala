"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BlurText } from "./animated-blur-text";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  textContent: string; // Заменили src на textContent для текста вместо изображений
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
  onLastCard,
  showMintButton = false,
  onMintClick,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
  onLastCard?: (isLast: boolean) => void;
  showMintButton?: boolean;
  onMintClick?: () => void;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    const newActive = (active + 1) % testimonials.length;
    setActive(newActive);
    onLastCard?.(newActive === testimonials.length - 1);
  };

  const handlePrev = () => {
    const newActive = (active - 1 + testimonials.length) % testimonials.length;
    setActive(newActive);
    onLastCard?.(newActive === testimonials.length - 1);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  useEffect(() => {
    onLastCard?.(active === testimonials.length - 1);
  }, [active, onLastCard, testimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-center min-h-screen", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div className="h-full w-full rounded-3xl bg-white flex items-center justify-center">
<div className="text-white text-center flex flex-col items-center justify-center h-full px-2">
                      <div className="text-6xl font-bold text-black mb-4">
                        {index + 1}
                      </div>
                      <BlurText
                        text={testimonial.textContent}
                        delay={100}
                        animateBy="letters"
                        direction="bottom"
                        className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 text-center px-2 leading-relaxed mb-2"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
<div className="flex flex-col py-4 items-center text-center w-full">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-foreground">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg text-muted-foreground mt-8">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
<div className="flex gap-4 pt-12 md:pt-0 md:mt-16 items-center justify-center w-full">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <ChevronLeft className="h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <ChevronRight className="h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
            {showMintButton && (
  <button
    onClick={onMintClick}
    className="group relative grid overflow-hidden rounded-full px-6 py-2 transition-all duration-200 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] hover:shadow-lg min-w-[150px] hover:scale-105 active:scale-95 text-lg font-semibold tracking-tight animate-fade-in"
  >
    <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:rotate-[-90deg] before:animate-rotate before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
    <span className="backdrop absolute inset-px rounded-[22px] transition-colors duration-200 bg-neutral-950 group-hover:bg-neutral-900 group-hover:text-white" />
    <span className="z-10 flex items-center justify-center gap-2 text-sm font-medium text-white group-hover:text-white transition-colors duration-200">
      Next
    </span>
  </button>
)}

          </div>
        </div>
      </div>
    </div>
  );
};