import { useState, useRef, useEffect } from 'react';

interface IntroVideoProps {
  onVideoEnd: () => void;
}

export function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const [isEnding, setIsEnding] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Start playing when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // If autoplay fails, skip to main content
        onVideoEnd();
      });
    }
  }, [onVideoEnd]);

  const handleVideoEnd = () => {
    setIsEnding(true);
    setTimeout(() => {
      onVideoEnd();
    }, 800);
  };

  const handleSkip = () => {
    setIsEnding(true);
    setTimeout(() => {
      onVideoEnd();
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-all duration-700 ${
        isEnding ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Video Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="w-full h-full object-cover"
        >
          <source src="/videos/intro-video.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 px-6 py-3 bg-foreground/10 backdrop-blur-sm text-foreground/80 rounded-full text-sm font-medium transition-all duration-300 hover:bg-foreground/20 hover:text-foreground border border-foreground/10"
        >
          Skip Intro
        </button>

        {/* Loading indicator */}
        <div className="absolute bottom-8 left-8 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Loading experience...</span>
        </div>
      </div>
    </div>
  );
}
