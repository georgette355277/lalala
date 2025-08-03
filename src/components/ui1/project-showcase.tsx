import React, { useState } from 'react';
import { HalomotButton } from './halomot-button';

interface Testimonial {
  name: string;
  quote: string;
  designation: string;
  text: string;
  link: string;
}

interface ProjectShowcaseProps {
  testimonials: Testimonial[];
  colors?: {
    name?: string;
    position?: string;
    testimony?: string;
  };
  fontSizes?: {
    name?: string;
    position?: string;
    testimony?: string;
  };
  spacing?: {
    nameTop?: string;
    nameBottom?: string;
    positionTop?: string;
    positionBottom?: string;
    testimonyTop?: string;
    testimonyBottom?: string;
    lineHeight?: string;
  };
  halomotButtonGradient?: string;
  halomotButtonBackground?: string;
  halomotButtonTextColor?: string;
  halomotButtonOuterBorderRadius?: string;
  halomotButtonInnerBorderRadius?: string;
  halomotButtonHoverTextColor?: string;
  onItemClick?: (link: string) => void;
  onSeventhCardNext?: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  testimonials,
  colors = {},
  fontSizes = {},
  spacing = {},
  halomotButtonGradient = "linear-gradient(to right, #603dec, #a123f4)",
  halomotButtonBackground = "#161616",
  halomotButtonTextColor = "#fff",
  halomotButtonOuterBorderRadius = "6.34px",
  halomotButtonInnerBorderRadius = "6px",
  halomotButtonHoverTextColor = "#fff",
  onItemClick,
  onSeventhCardNext,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    
    if (currentIndex === testimonials.length - 1) {
      if (onSeventhCardNext) {
        onSeventhCardNext();
      }
      return;
    }
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleItemClick = () => {
    if (currentIndex === testimonials.length - 1) {
      nextTestimonial();
    } else {
      if (onItemClick && testimonials[currentIndex]?.link) {
        onItemClick(testimonials[currentIndex].link);
      }
    }
  };

  const currentTestimonial = testimonials[currentIndex];

  if (!currentTestimonial) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
          <h2 
            style={{ 
              color: colors.name || "#fff",
              fontSize: fontSizes.name || "28px",
              marginTop: spacing.nameTop || "0",
              marginBottom: spacing.nameBottom || "10px"
            }}
            className="font-bold"
          >
            {currentTestimonial.name}
          </h2>
          
          <p 
            style={{ 
              color: colors.position || "#aaa",
              fontSize: fontSizes.position || "20px",
              marginTop: spacing.positionTop || "0",
              marginBottom: spacing.positionBottom || "0.5em"
            }}
            className="mb-4"
          >
            {currentTestimonial.designation}
          </p>
          
          <blockquote 
            style={{ 
              color: colors.testimony || "#eee",
              fontSize: fontSizes.testimony || "20px",
              marginTop: spacing.testimonyTop || "1.24em",
              marginBottom: spacing.testimonyBottom || "1em",
              lineHeight: spacing.lineHeight || "1.56"
            }}
            className="text-lg mb-6 italic max-w-3xl mx-auto"
          >
            "{currentTestimonial.quote}"
          </blockquote>
          
          <p className="text-gray-300 mb-8 text-lg">
            {currentTestimonial.text}
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prevTestimonial}
            disabled={isAnimating}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300"
          >
            Previous
          </button>

          <HalomotButton
            onClick={handleItemClick}
            disabled={isAnimating}
            className="px-8 py-3"
            inscription={currentIndex === testimonials.length - 1 ? 'Next' : 'Visit Project'}
            gradient={halomotButtonGradient}
            backgroundColor={halomotButtonBackground}
            textColor={halomotButtonTextColor}
            outerBorderRadius={halomotButtonOuterBorderRadius}
            innerBorderRadius={halomotButtonInnerBorderRadius}
            hoverTextColor={halomotButtonHoverTextColor}
          />

          <button
            onClick={nextTestimonial}
            disabled={isAnimating}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300"
          >
            Next
          </button>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => !isAnimating && setCurrentIndex(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-purple-500 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};