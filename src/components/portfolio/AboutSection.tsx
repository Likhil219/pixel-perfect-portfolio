import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';
import likhilPhoto from '@/assets/likhil-photo.png';

const stats = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 15, suffix: '', label: 'Countries Served' },
];

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Floating Dots */}
      <div className="absolute top-20 right-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float" />
      <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-accent/30 rounded-full animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Avatar Column */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Avatar Container */}
            <div className="relative group">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl rotate-6 transition-transform duration-500 group-hover:rotate-12" />
                <div className="relative bg-card rounded-3xl overflow-hidden border border-border/50">
                  <img 
                    src={likhilPhoto} 
                    alt="Likhil - Automation Expert" 
                    className="w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Greeting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-4xl animate-bounce inline-block">👋</span>
                      <p className="text-primary-foreground font-display text-2xl font-bold mt-2">
                        Hello there!
                      </p>
                      <p className="text-primary-foreground/80 text-sm mt-1">
                        Nice to meet you
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-primary rounded-lg rotate-12 animate-float" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full animate-pulse-glow" />
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-8">
            <div 
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">About Me</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
                Crafting Digital Excellence for Over Two Decades
              </h2>
            </div>

            <p 
              className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              With 20+ years crafting digital experiences, I help ambitious businesses transform 
              their online presence into revenue-generating assets. My approach combines strategic 
              thinking with meticulous craft—every project is built to perform, not just impress.
            </p>

            <p 
              className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              From startups to Fortune 500s, I've partnered with brands across 15 countries 
              to create digital products that users love and businesses rely on.
            </p>

            {/* Stats */}
            <div 
              className={`grid grid-cols-3 gap-8 pt-8 border-t border-border transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              {stats.map((stat, index) => (
                <StatItem key={stat.label} {...stat} isVisible={isVisible} delay={index * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ 
  value, 
  suffix, 
  label, 
  isVisible, 
  delay 
}: { 
  value: number; 
  suffix: string; 
  label: string; 
  isVisible: boolean; 
  delay: number;
}) {
  const count = useCountUp(value, isVisible, 2000, suffix);

  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold gradient-text">
        {count}
      </div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </div>
  );
}
