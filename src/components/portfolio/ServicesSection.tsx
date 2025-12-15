import { useScrollReveal } from '@/hooks/useScrollReveal';
import { 
  Monitor, 
  Palette, 
  Layout, 
  Sparkles, 
  Search,
  ArrowUpRight
} from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: 'Web Design & Development',
    description: 'Beautiful, high-performance websites built to convert visitors into loyal customers.',
    features: ['Custom Design', 'Responsive Build', 'Performance Optimized']
  },
  {
    icon: Palette,
    title: 'Brand Identity & Strategy',
    description: 'Cohesive visual systems that resonate with your audience and stand out in the market.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity']
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'Intuitive interfaces backed by user research, testing, and data-driven decisions.',
    features: ['User Research', 'Prototyping', 'Usability Testing']
  },
  {
    icon: Sparkles,
    title: 'Motion & Interaction Design',
    description: 'Micro-animations and interactions that delight users and guide them seamlessly.',
    features: ['Micro-interactions', 'Page Transitions', 'Loading States']
  },
  {
    icon: Search,
    title: 'Consulting & Audits',
    description: 'Expert analysis to identify opportunities and optimize your digital presence.',
    features: ['UX Audits', 'Strategy Sessions', 'Performance Reviews']
  },
];

export function ServicesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 relative bg-card/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-primary/30 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/40 rounded-full" />
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-primary/20 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Services</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Everything You Need to <span className="gradient-text">Dominate</span> Online
          </h2>
          <p className="text-lg text-muted-foreground">
            End-to-end digital solutions tailored to ambitious brands ready to make their mark.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              {...service} 
              isVisible={isVisible}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  features,
  isVisible, 
  delay 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  description: string; 
  features: string[];
  isVisible: boolean; 
  delay: number;
}) {
  return (
    <div 
      className={`group relative p-8 rounded-2xl bg-card border border-border/50 transition-all duration-500 hover:border-primary/30 hover:card-shadow-hover ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
          <Icon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:rotate-6" />
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-semibold mb-3 flex items-center gap-2">
          {title}
          <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <span 
              key={feature}
              className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
