import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Redesign',
    category: 'E-Commerce',
    description: 'Complete redesign increasing conversions by 180%',
    gradient: 'from-violet-600 to-indigo-600',
    year: '2024'
  },
  {
    title: 'SaaS Dashboard',
    category: 'SaaS',
    description: 'Analytics platform serving 50K+ daily users',
    gradient: 'from-blue-600 to-cyan-500',
    year: '2024'
  },
  {
    title: 'Luxury Brand Identity',
    category: 'Branding',
    description: 'Complete visual identity for premium fashion label',
    gradient: 'from-amber-500 to-orange-600',
    year: '2023'
  },
  {
    title: 'FinTech Mobile App',
    category: 'Mobile',
    description: 'Award-winning banking experience for Gen Z',
    gradient: 'from-emerald-500 to-teal-600',
    year: '2023'
  },
  {
    title: 'Tech Startup Launch',
    category: 'Marketing',
    description: 'Launch site that secured $2M in seed funding',
    gradient: 'from-pink-500 to-rose-600',
    year: '2023'
  },
  {
    title: 'Product Configurator',
    category: 'Product',
    description: '3D product builder with real-time customization',
    gradient: 'from-purple-600 to-violet-600',
    year: '2024'
  },
];

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

export function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div 
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Selected Work</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Projects That <span className="gradient-text">Speak</span> for Themselves
          </h2>
          <p className="text-lg text-muted-foreground">
            A curated collection of work that demonstrates strategic thinking and meticulous execution.
          </p>
        </div>

        {/* Category Filter */}
        <div 
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              {...project} 
              isVisible={isVisible}
              delay={index * 80}
              isHovered={hoveredProject === project.title}
              isBlurred={hoveredProject !== null && hoveredProject !== project.title}
              onHover={() => setHoveredProject(project.title)}
              onLeave={() => setHoveredProject(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ 
  title, 
  category, 
  description, 
  gradient,
  year,
  isVisible, 
  delay,
  isHovered,
  isBlurred,
  onHover,
  onLeave
}: { 
  title: string; 
  category: string; 
  description: string; 
  gradient: string;
  year: string;
  isVisible: boolean; 
  delay: number;
  isHovered: boolean;
  isBlurred: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div 
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
      } ${isBlurred ? 'blur-sm scale-95' : ''} ${isHovered ? 'scale-[1.02]' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Thumbnail */}
      <div className={`aspect-[4/3] bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-20 h-20 border border-white/20 rounded-full" />
          <div className="absolute bottom-4 right-4 w-32 h-32 border border-white/10 rounded-lg rotate-12" />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
              <ExternalLink className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
              View Project
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-card border border-t-0 border-border/50 rounded-b-2xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">{category}</span>
          <span className="text-xs text-muted-foreground">{year}</span>
        </div>
        <h3 className="font-display text-lg font-semibold mb-2 flex items-center gap-2">
          {title}
          <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
