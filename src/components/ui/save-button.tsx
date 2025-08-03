import React, { useState } from 'react';
import { ShimmerButton } from './shimmer-button';

interface SaveButtonProps {
  text?: {
    idle: string;
    saving: string;
    saved: string;
  };
  onSave?: () => Promise<void> | void;
  className?: string;
  disabled?: boolean;
}

export function SaveButton({
  text = {
    idle: 'Save',
    saving: 'Saving...',
    saved: 'Saved!'
  },
  onSave,
  className,
  disabled = false
}: SaveButtonProps) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleClick = async () => {
    if (state === 'saving' || disabled) return;
    
    setState('saving');
    
    try {
      await onSave?.();
      setState('saved');
      
      // Reset to idle after 2 seconds
      setTimeout(() => {
        setState('idle');
      }, 2000);
    } catch (error) {
      setState('idle');
    }
  };

  const getCurrentText = () => {
    switch (state) {
      case 'saving':
        return text.saving;
      case 'saved':
        return text.saved;
      default:
        return text.idle;
    }
  };

  return (
    <ShimmerButton
      onClick={handleClick} 
      disabled={state === 'saving'}
      className={className}
    >
      <span className="text-[1.125rem]">{getCurrentText()}</span>
    </ShimmerButton>
  );
}