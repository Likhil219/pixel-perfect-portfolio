import { useScrollReveal } from '@/hooks/useScrollReveal';

const clients = [
  'TechCorp', 'InnovateLabs', 'GrowthStart', 'DigitalFirst', 
  'FutureScale', 'CloudNine', 'DataFlow', 'SmartSolutions'
];

export function TrustBar() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref}
      className="py-16 border-y border-border/50 overflow-hidden bg-card/30"
    >
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p 
          className={`text-center text-sm text-muted-foreground uppercase tracking-widest transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Trusted by 50+ businesses worldwide
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex animate-marquee">
          {/* First Set */}
          {[...clients, ...clients].map((client, index) => (
            <div 
              key={`${client}-${index}`}
              className="flex-shrink-0 mx-12 group cursor-pointer"
            >
              <div className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 group-hover:bg-card">
                {/* Logo Placeholder */}
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:bg-primary/20">
                  <span className="text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    {client.charAt(0)}
                  </span>
                </div>
                <span className="text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                  {client}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
