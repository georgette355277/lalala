import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ShimmerButton } from './shimmer-button';

interface EthAddressInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onSubmit: (success: boolean, errorMsg?: string) => void;
  showNextButton: boolean;
  onNextClick: () => void;
  className?: string;
}

export function EthAddressInput({
  value,
  onChange,
  error,
  onSubmit,
  showNextButton,
  onNextClick,
  className
}: EthAddressInputProps) {
  const [isChecking, setIsChecking] = useState(false);

  const isValidEthAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSubmit = async () => {
    if (!value.trim()) {
      onSubmit(false, 'Please enter an ETH address.');
      return;
    }

    // Если больше 30 символов - имитируем проверку
    if (value.length > 30) {
      setIsChecking(true);
      
      // Имитация проверки 3 секунды
      setTimeout(() => {
        setIsChecking(false);
        onSubmit(true); // Всегда успешно для длинных адресов
      }, 3000);
      return;
    }

    // Обычная валидация для коротких адресов
    if (isValidEthAddress(value)) {
      onSubmit(true);
    } else {
      onSubmit(false, 'Please enter a valid ETH address.');
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {error && (
        <div className="mb-2 text-red-400 text-sm text-center animate-fade-in">
          <span className="text-sm">{error}</span>
        </div>
      )}
      
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter your ETH address"
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
        />
      </div>

      {!showNextButton ? (
        <ShimmerButton
          onClick={handleSubmit}
          disabled={isChecking}
          className="w-full h-10 text-sm px-4 py-2"
        >
          <span className="relative z-10 text-white font-medium">
            {isChecking ? 'Checking...' : 'Submit'}
          </span>
        </ShimmerButton>
      ) : (
        <ShimmerButton
          onClick={onNextClick}
          className="w-full h-10 text-sm px-4 py-2"
        >
          <span className="relative z-10 text-white font-medium">
            Next
          </span>
        </ShimmerButton>
      )}
    </div>
  );
}