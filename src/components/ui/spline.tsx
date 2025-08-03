import React, { useRef, useEffect } from 'react';

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className = "" }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let splineViewer: any = null;

    const loadSpline = async () => {
      try {
        // Dynamically import Spline runtime
        const { Application } = await import('@splinetool/runtime');
        
        if (canvasRef.current) {
          splineViewer = new Application(canvasRef.current);
          await splineViewer.load(scene);
        }
      } catch (error) {
        console.warn('Spline failed to load:', error);
        // Fallback: show a placeholder
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.fillStyle = '#666';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('3D Scene Loading...', canvasRef.current.width / 2, canvasRef.current.height / 2);
          }
        }
      }
    };

    loadSpline();

    return () => {
      if (splineViewer) {
        try {
          splineViewer.dispose();
        } catch (error) {
          console.warn('Error disposing Spline viewer:', error);
        }
      }
    };
  }, [scene]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}