import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle } from 'lucide-react';

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
  onNextClick
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValidEthAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSubmit = () => {
    console.log('Submit clicked, value length:', value.length);
    
    if (value.length >= 30) {
      console.log('Validation passed, calling onSubmit(true)');
      onSubmit(true);
    } else {
      console.log('Validation failed, calling onSubmit(false)');
      onSubmit(false, 'Please enter a valid ETH address (minimum 30 characters).');
    }

    if (!isValidEthAddress(value)) {
      onSubmit(false, 'Please enter a valid ETH address.');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      onSubmit(true);
    }, 3000);
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
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-xl"
        />
        
        <div className="relative bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder="Enter your ETH address"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              disabled={isLoading || isSubmitted}
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center space-x-2 text-blue-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
              <span className="text-sm">Checking address...</span>
            </div>
          )}

          {isSubmitted && (
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Address verified!</span>
            </div>
          )}

          <div className="flex justify-center">
            {!showNextButton ? (
              <button
                onClick={handleSubmit}
                disabled={isLoading || isSubmitted}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                {isLoading ? 'Checking...' : 'Submit'}
              </button>
            ) : (
              <button
                onClick={onNextClick}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-md hover:from-green-600 hover:to-blue-700 transition-all duration-200 font-medium"
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