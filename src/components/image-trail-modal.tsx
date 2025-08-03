import React, { useEffect } from 'react';
import { ImageTrail } from '@/components/ui1/image-trail';
import { X } from 'lucide-react';

interface ImageTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImageTrailModal({ isOpen, onClose }: ImageTrailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const imageItems = [
    '/src/assets/coinmarketcap.png',
    '/src/assets/coinmarketcap.png',
    '/src/assets/coinmarketcap.png',
    '/src/assets/coinmarketcap.png',
    '/src/assets/coinmarketcap.png',
    '/src/assets/coinmarketcap.png',
    '/src/assets/coinmarketcap.png',
    '/src/assets/coinmarketcap.png',
    '/src/assets/coinmarketcap.png',
    '/src/assets/coinmarketcap.png',
    '/src/assets/coinmarketcap.png',
    '/src/assets/coinmarketcap.png',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className="relative z-10 w-[90vw] max-w-4xl h-[80vh] bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[200] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="w-full h-full">
          <ImageTrail
            items={imageItems}
            variant={1}
            className="w-full h-full"
            imageClassName="w-[200px] h-[200px] object-contain rounded-lg"
          />
        </div>
        
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-[300] flex flex-col items-center space-y-4">
          <p className="text-white/80 text-sm text-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
            Move your mouse or finger to reveal the NFT
          </p>
          
          <button 
            className="interact-button flex h-full w-full items-center justify-center text-white"
            onClick={onClose}
          >
            <span className="text-[1.125rem]">Mint</span>
          </button>
        </div>
      </div>
    </div>
  );
}