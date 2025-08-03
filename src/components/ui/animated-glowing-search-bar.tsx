import React from 'react';
import { motion } from 'framer-motion';

interface SearchComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  onSubmit: (success: boolean, errorMsg?: string) => void;
  showNextButton: boolean;
  onNextClick: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  value,
  onChange,
  error,
  onSubmit,
  showNextButton,
  onNextClick,
}) => {
  const handleSubmit = () => {
    console.log("Submit clicked, value length:", value.length);
    if (value.length >= 30) {
      console.log("Validation passed, calling onSubmit(true)");
      onSubmit(true);
    } else {
      console.log("Validation failed, calling onSubmit(false)");
      onSubmit(false, "Please enter a valid ETH address.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative w-full">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-sm"
        />
        
        <div className="relative bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg p-4 space-y-4">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Enter your ETH address"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none text-sm pr-4"
          />
          
          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}
          
          <div className="flex gap-2 items-center">
            {!showNextButton ? (
              <button
                onClick={handleSubmit}
                disabled={value.length < 30}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  value.length >= 30
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            ) : (
              <button
                onClick={onNextClick}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-all duration-200"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;