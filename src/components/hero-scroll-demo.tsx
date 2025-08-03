import React, { useState } from "react";
import { SplineScene } from "@/components/ui/splite";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ImageTrailModal } from "@/components/image-trail-modal";

export function HeroScrollDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black p-2 sm:p-4">
      {/* Tablet Container */}
      <div className="relative">
        {/* Tablet Frame */}
        <div 
          className="relative bg-gray-800 rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-4 shadow-2xl"
          style={{
            width: 'min(95vw, 1100px)',
            height: 'min(60vh, 700px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Screen */}
          <div className="w-full h-full bg-black rounded-[1.2rem] sm:rounded-[1.5rem] overflow-hidden relative">
            {/* Robot Scene */}
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
            
            {/* Mint Button */}
            <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-10">
              <ShinyButton onClick={() => setIsModalOpen(true)}>
                Mint
              </ShinyButton>
            </div>
          </div>
          
          {/* Home Button */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <ImageTrailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}