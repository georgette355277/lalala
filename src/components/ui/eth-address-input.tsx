import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ShimmerButton } from '@/components/ui/shimmer-button';

interface EthAddressInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onSubmit: (success: boolean, errorMsg?: string) => void;
  showNextButton?: boolean;
  onNextClick?: () => void;
  className?: string;
}

export function EthAddressInput({
  value,
  onChange,
  error,
  onSubmit,
  showNextButton = false,
  onNextClick,
  className
}: EthAddressInputProps) {
  const [isChecking, setIsChecking] = useState(false);

  const validateEthAddress = (address: string): boolean => {
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethRegex.test(address);
  };

  const handleSubmit = async () => {
    if (!value.trim()) {
      onSubmit(false, 'Please enter an ETH address.');
      return;
    }

    // If more than 30 characters, simulate checking
    if (value.length > 30) {
      setIsChecking(true);
      
      // Simulate 3 second check
      setTimeout(() => {
        setIsChecking(false);
        onSubmit(true); // Always success for long addresses
      }, 3000);
      
      return;
    }

    // Regular ETH address validation for shorter addresses
    if (validateEthAddress(value)) {
      onSubmit(true);
    } else {
      onSubmit(false, 'Please enter a valid ETH address.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isChecking && !showNextButton) {
      handleSubmit();
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {error && (
        <div className="mb-2 text-red-400 text-sm text-center animate-fade-in">
          <span className="text-sm">{error}</span>
        </div>
      )}
      
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter your ETH address"
          className="flex-1 h-12 px-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          disabled={isChecking}
        />
        
        {showNextButton ? (
          <ShimmerButton
            onClick={onNextClick}
            className="flex-shrink-0 h-12 px-6"
          >
            <span className="relative z-10 text-white font-medium">Next</span>
          </ShimmerButton>
        ) : (
          <ShimmerButton
            onClick={handleSubmit}
            disabled={isChecking}
            className="flex-shrink-0 h-12 px-6"
          >
            <span className="relative z-10 text-white font-medium">
              {isChecking ? 'Checking...' : 'Submit'}
            </span>
          </ShimmerButton>
        )}
      </div>
    </div>
  );
}