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
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        "transition-all duration-300",
        className
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {state === 'idle' && text.idle}
        {state === 'saving' && text.saving}
        {state === 'saved' && text.saved}
      </span>
    </button>
  );
}