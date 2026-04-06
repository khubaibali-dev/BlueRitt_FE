import React, { useState, useEffect, useCallback } from "react";

const DetailedSkeletonLoader = React.memo(({ isLoading }: { isLoading: boolean }) => {
  const [progress, setProgress] = useState(0);
  
  // Using a ref to hold the interval ID instead of a let variable inside the component
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startProgressTimer = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) return 98; // Cap at 98% while loading
          if (prev >= 90) return prev + 1;
          if (prev >= 70) return prev + 3;
          return prev + 8;
        });
      }, 1000); // every second for smoother progress
    }
  }, []);

  const stopProgressTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      startProgressTimer();
    } else {
      setProgress(100);
      stopProgressTimer();
    }

    return () => {
      stopProgressTimer(); // Cleanup on unmount
    };
  }, [isLoading, startProgressTimer, stopProgressTimer]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 animate-in fade-in duration-700">
      <div className="text-center flex flex-col items-center w-full max-w-[600px] mb-8">
        <h3 className="text-brand-textPrimary text-xl font-bold mb-2 tracking-tight">
          Analyzing Product & Discovering Suppliers
        </h3>
        <p className="text-brand-textSecondary italic text-sm">
          Please wait while we generate the most accurate results for you. 
          This may take up to 30 seconds.
        </p>
      </div>

      <div 
        className="relative w-full max-w-[500px] h-3 bg-brand-inputBg rounded-full overflow-hidden border border-brand-border"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div 
          className="h-full bg-brand-gradient transition-all duration-500 ease-out shadow-[0_0_15px_rgba(45,108,223,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="text-brand-textPrimary font-mono text-sm font-bold tracking-widest">
        {progress}% COMPLETE
      </div>
    </div>
  );
});

export default DetailedSkeletonLoader;
