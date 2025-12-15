import { useScrollReveal } from '@/hooks/useScrollReveal';
import { 
  Target, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Award 
} from 'lucide-react';

const pillars = [
  {
    icon: Target,
    title: 'Precision Craft',
    description: 'Every detail is intentional—from typography choices to hover state timings. Nothing is accidental.'
  },
  {
    icon: MessageCircle,
    title: 'Clear Communication',
    description: 'No jargon, no surprises. Just transparent collaboration and honest feedback throughout the process.'
  },
  {
    icon: TrendingUp,
    title: 'Results-Driven',
    description: 'Beautiful design means nothing without results. Every project is built to convert and perform.'
  },
  {
    icon: Users,
    title: 'End-to-End Partner',
    description: 'From initial strategy through launch and beyond—I\'m invested in your long-term success.'
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description: '20 years of delivering excellence. A portfolio of happy clients and award-winning work.'
  },
];

export function WhyChooseSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="why-choose" ref={ref} className="py-24 md:py-32 relative bg-card/30 overflow-hidden">
      {/* Background Flowing Icons */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-0 left-0 flex gap-8 animate-marquee">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex-shrink-0 flex items-center gap-8">
              <Target className="w-12 h-12" />
              <MessageCircle className="w-12 h-12" />
              <TrendingUp className="w-12 h-12" />
              <Users className="w-12 h-12" />
              <Award className="w-12 h-12" />
            </div>
          ))}
        </div>
      </div>

      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Why Choose Me</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            The <span className="gradient-text">Difference</span> is in the Details
          </h2>
          <p className="text-lg text-muted-foreground">
            When you partner with me, you're not just getting a designer—you're gaining a strategic ally committed to your success.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <PillarCard 
              key={pillar.title} 
              {...pillar} 
              isVisible={isVisible}
              delay={index * 100}
              isLast={index === pillars.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ 
  icon: Icon, 
  title, 
  description, 
  isVisible, 
  delay,
  isLast
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  description: string; 
  isVisible: boolean; 
  delay: number;
  isLast: boolean;
}) {
  return (
    <div 
      className={`group relative p-8 rounded-2xl bg-card border border-border/50 transition-all duration-500 hover:border-primary/50 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      } ${isLast ? 'md:col-span-2 lg:col-span-1' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Accent Border Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
          <Icon className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-semibold mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
