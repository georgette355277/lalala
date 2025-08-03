import React, { useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SplineScene } from "@/components/ui/splite";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ImageTrailModal } from "@/components/image-trail-modal";

export function HeroScrollDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ContainerScroll
        titleComponent={
          <></>
        }
      >
        <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full absolute inset-0"
          />
          
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10">
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