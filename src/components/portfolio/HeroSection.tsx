import { useEffect, useState } from 'react';
import { ArrowDown, Play } from 'lucide-react';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/70" />
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <h1 
          className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Access <span className="gradient-text">Top Marketing</span>
          <br />
          <span className="gradient-text">Talent</span> Instantly!
        </h1>

        {/* Subtext */}
        <p 
          className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          Unlock Top-Tier Marketing Expertise Without Overspending — Your Success is Just a Step Away! Let us help you achieve your business goals.
        </p>

        {/* CTAs */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <button 
            onClick={scrollToContact}
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-accent"
          >
            <span className="relative z-10">Get Started</span>
          </button>
          
          <button 
            onClick={() => window.open('https://www.youtube.com/channel/UCjk1XYuLUhMvjGISg2Udsuw', '_blank')}
            className="flex items-center gap-2 px-6 py-4 text-foreground font-medium transition-all duration-300 hover:text-primary"
          >
            Watch Video
            <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-primary">
              <Play className="w-3 h-3 fill-current" />
            </div>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle">
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  );
}
