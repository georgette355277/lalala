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
  onNextClick: () => void;
  className?: string;
  onSubmit: (success: boolean, error?: string) => void;
  showNextButton: boolean;
}

export function EthAddressInput({
  value,
  onChange,
  onSubmit,
  showNextButton,
  className
}: EthAddressInputProps) {
  const [showNext, setShowNext] = useState(false);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 52,
  });
  

  const isValidEthAddress = (address: string): boolean => {
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethRegex.test(address);
  };

  const handleSubmit = async () => {
    if (value.length < 30) {
      onSubmit(false, 'Address must be at least 30 characters long.');
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
    }, 1500);
    setIsLoading(true);
    
    // Simulate checking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setShowNext(true);
  };

  const handleNext = () => {
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
          {!showNextButton && (
            <SaveButton
              text={{
                idle: "Submit",
                saving: "Checking...",
                saved: "Submit"
              }}
              onSave={handleSubmit}
              className="text-sm px-4 py-2 min-w-[100px]"
              disabled={isSubmitting}
            />
          )}

          {/* Next Button */}
          {showNextButton && (
            <SaveButton
              text={{
                idle: "Next",
                saving: "Loading...",
                saved: "Next"
              }}
              onSave={handleNext}
              className="text-sm px-4 py-2 min-w-[100px]"
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}