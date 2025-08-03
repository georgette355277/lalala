import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';

interface AnimatedGlowingSearchBarProps {
  onNext?: () => void;
}

export function AnimatedGlowingSearchBar({ onNext }: AnimatedGlowingSearchBarProps) {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const handleSubmit = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setIsSubmitted(true);
    
    // Show Next button after 5 seconds
    setTimeout(() => {
      setIsLoading(false);
      setShowNext(true);
    }, 5000);
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <motion.div
    <div className="w-full max-w-md mx-auto">
      <div className="relative w-full">
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="flex gap-2 mt-2 px-1">
            {!showNextButton ? (
              <button
                onClick={handleSubmit}
                disabled={isLoading || !value.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-all duration-200 text-sm"
              >
                {isLoading ? 'Processing...' : 'Submit'}
              </button>
            ) : (
              <button
                onClick={onNextClick}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 text-sm"
              >
                Next
              </button>
            )}
          </div>
          
          <div className="relative bg-black/20 backdrop-blur-sm rounded-full p-1">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-3">
              <Search className="w-5 h-5 text-white/70 mr-3" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter ETH address..."
                className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
                disabled={isLoading || showNext}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {!showNext ? (
          <motion.button
            onClick={handleSubmit}
            disabled={isLoading || !address.trim()}
            className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                'Submit'
              )}
            </span>
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
    </div>
  );
}

export default AnimatedGlowingSearchBar;