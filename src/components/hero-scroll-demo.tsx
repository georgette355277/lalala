import React, { useState } from "react";
import { ContainerScroll } from "@/components/ui1/container-scroll-animation";
import { SplineScene } from "@/components/ui1/spline";
import { ShinyButton } from "@/components/ui1/shiny-button";
import { ImageTrailModal } from "@/components/image-trail-modal";

export function HeroScrollDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-black dark:text-white text-center">
            <span className="text-3xl sm:text-4xl md:text-[6rem] font-bold mt-1 leading-none">
            </span>
          </h1>
        }
      >
        <div className="relative w-full h-full bg-black rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 z-10 pointer-events-none" />
          
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full relative z-20 min-w-[320px] min-h-[400px] md:min-w-[800px] md:min-h-[600px]"
          />
          
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-30">
            <ShinyButton onClick={() => setIsModalOpen(true)}>
              Mint
            </ShinyButton>
          </div>
        </div>
      </ContainerScroll>
      
      <ImageTrailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}