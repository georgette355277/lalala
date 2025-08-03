@@ .. @@
   const handleSave = async () => {
     if (state !== 'idle') return;
     
     setState('saving');
     try {
-      await onSubmit();
+      await onSave();
       setState('saved');
       setTimeout(() => setState('idle'), 2000);
     } catch (error) {