const handleSave = async () => {
    if (state !== 'idle') return;
    
    setState('saving');
    try {
      await onSave();
      setState('saved');
      setTimeout(() => setState('idle'), 2000);
    } catch (error) {
    }
  };
  saved: "Saved!"
};

export function SaveButton({
  text = {
    idle: "Save",
    saving: "Saving...",
  },
  onSave,
  className = "",
  ...props
}: SaveButtonProps) {

}