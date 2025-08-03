import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface SaveButtonProps {
  text?: {
    idle: string;
    saving: string;
    saved: string;
  };
  onSave: () => Promise<void> | void;
  className?: string;
}

export function SaveButton({
  text = {
    idle: "Save",
    saving: "Saving...",
    saved: "Saved!"
  },
  onSave,
  className = "",
  ...props
}: SaveButtonProps) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = async () => {
    if (state !== 'idle') return;
    
    setState('saving');
    try {
      await onSave();
      setState('saved');
      setTimeout(() => setState('idle'), 2000);
    } catch (error) {
      setState('idle');
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={state === 'saving'}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {text[state]}
      </span>
    </button>
  );
}