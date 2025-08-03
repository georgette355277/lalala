"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { SaveButton } from "@/components/ui/save-button";

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

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 52,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEthAddress = (address: string): boolean => {
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethRegex.test(address);
  };

  const handleSubmit = async () => {
    if (!value.trim()) {
      onSubmit(false, 'Please enter an ETH address.');
      return;
    }

    // Если больше 30 символов, начинаем проверку
    if (value.length > 30) {
      setIsChecking(true);
      
      // Имитируем проверку (3 секунды)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIsChecking(false);
      onSubmit(true); // Успешная проверка
      return;
    }

    if (!isValidEthAddress(value)) {
      onSubmit(false, 'Please enter a valid ETH address (0x followed by 40 characters)');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const handleNext = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    onNextClick();
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Error message at top */}
      {error && (
        <div className="mb-2 text-red-400 text-sm text-center animate-fade-in">
          {error}
        </div>
      )}
      
      <div className="relative flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
        <input
          type="text"
          placeholder="Enter your ETH address..."
          className={cn(
            "flex-1 bg-transparent text-white placeholder:text-white/50",
            "border-none outline-none px-2 py-2",
            "text-sm"
          )}
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!showNextButton) {
                handleSubmit();
              }
            }
          }}
        />

        <div className="flex items-center gap-2">
          {/* Submit Button */}
          {!showNextButton && (
            <SaveButton
              text={{
                idle: isChecking ? "Checking..." : "Submit",
                saving: "Checking...",
                saved: "Submit"
              }}
              onSave={handleSubmit}
              className="ml-2 px-6 py-2 text-sm"
              disabled={isChecking}
              disabled={isSubmitting}
            />
          )}

          {/* Next Button */}
          {showNextButton && (
            <SaveButton
              text={{
                idle: "Next",
                saving: "Loading...",
                saved: "Ready!"
              }}
              onSave={handleNext}
              className="text-sm px-4 py-2 min-w-[100px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}