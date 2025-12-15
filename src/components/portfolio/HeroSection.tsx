import { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 gradient-hero-bg" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Floating Geometric Shapes */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"
        style={{ 
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` 
        }}
      />
      <div 
        className="absolute bottom-32 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed"
        style={{ 
          transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)` 
        }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary rotate-45 animate-float"
        style={{ 
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) rotate(45deg)`,
          animationDelay: '1s'
        }}
      />
      <div 
        className="absolute bottom-1/3 left-1/4 w-6 h-6 border-2 border-accent/50 rounded-full animate-float-delayed"
        style={{ 
          transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * -0.8}px)` 
        }}
      />
      <div 
        className="absolute top-1/2 left-20 w-3 h-3 bg-accent/60 rounded-full animate-pulse-glow"
        style={{ 
          transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px)` 
        }}
      />

      {/* Spinning Ring */}
      <div className="absolute top-1/4 right-10 w-32 h-32 border border-primary/20 rounded-full animate-spin-slow" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Available for new projects</span>
        </div>

        {/* Headline */}
        <h1 
          className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          I Design Digital
          <br />
          <span className="gradient-text">Experiences</span> That
          <br />
          Convert
        </h1>

        {/* Subtext */}
        <p 
          className={`text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          Premium web design & development for ambitious brands ready to dominate their market
        </p>

        {/* CTAs */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <button 
            onClick={scrollToContact}
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 glow-primary"
          >
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button 
            onClick={scrollToWork}
            className="px-8 py-4 border border-border text-foreground font-semibold rounded-full transition-all duration-300 hover:bg-card hover:border-primary/50"
          >
            View My Work
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  );
}
