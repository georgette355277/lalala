import React, { useState } from 'react';
import { cn } from '@/lib/utils';

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
    idle: "Save",
    saving: "Saving...",
    saved: "Saved!"
  },
  onSave,
  className,
  disabled = false
}: SaveButtonProps) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleClick = async () => {
    if (disabled || state !== 'idle') return;
    
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

  return (
    <button
      onClick={handleClick}
      disabled={disabled || state === 'saving'}
    <button 
      onClick={handleClick}
      disabled={state === 'saving'}
      className={cn(
        "interact-button",
        className
      )}
    >
      {text[state]}
    </button>
  )
  );
}