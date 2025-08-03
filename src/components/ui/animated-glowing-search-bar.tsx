@@ .. @@
   const handleSubmit = () => {
-    if (isLoading || isSubmitted) return;
+    if (isLoading) return;
     
     if (!value.trim()) {
       setError('Please enter an ETH address');
       return;
     }
     
-    setIsLoading(true);
-    setError('');
-    
-    // Simulate 5 second loading
-    setTimeout(() => {
-      setIsLoading(false);
-      onSubmit(true);
-    }, 5000);
+    if (!isSubmitted) {
+      setIsLoading(true);
+      setError('');
+      setIsSubmitted(true);
+      
+      // Simulate 5 second loading
+      setTimeout(() => {
+        setIsLoading(false);
+        onSubmit(true);
+      }, 5000);
+    }
   };