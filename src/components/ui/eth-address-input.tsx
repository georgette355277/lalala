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
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 52,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEthAddress = (address: string): boolean => {
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethRegex.test(address);
  };

  const handleSubmit = async () => {
    if (!value.trim()) {
      onSubmit(false, 'Please enter an ETH address.');
      return;
    }

    if (!validateEthAddress(value)) {
      onSubmit(false, 'Please enter a valid ETH address.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    onSubmit(true);
  };

  const handleNext = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    onNextClick();
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-3 w-full">
        {/* Input */}
        <div className="flex-1 relative">
          <Textarea
            placeholder="Enter your ETH address..."
            className={cn(
              "bg-black/20 dark:bg-white/10 rounded-2xl px-4 py-3",
              "placeholder:text-white/50",
              "border border-white/20 ring-white/20",
              "text-white text-wrap",
              "overflow-y-hidden resize-none",
              "focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:ring-offset-0",
              "transition-all duration-200",
              "leading-[1.2]",
              "min-h-[52px] max-h-[52px]",
              "[&::-webkit-resizer]:hidden",
              error && "border-red-500/50 ring-red-500/20"
            )}
            ref={textareaRef}
            value={value}
            onChange={(e: any) => {
              onChange(e);
              adjustHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!showNextButton) {
                  handleSubmit();
                }
              }
            }}
          />
        </div>

        {/* Submit Button */}
        {!showNextButton && (
          <SaveButton
            text={{
              idle: "Submit",
              saving: "Checking...",
              saved: "Checked!"
            }}
            onSave={handleSubmit}
            className="px-6 py-3 text-sm whitespace-nowrap"
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
            className="px-6 py-3 text-sm whitespace-nowrap"
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-sm mt-2 text-center">
          {error}
        </p>
      )}
    </div>
  );
}