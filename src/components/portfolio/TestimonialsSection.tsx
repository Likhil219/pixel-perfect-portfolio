import { useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Working with this designer transformed our digital presence completely. Conversions increased 240% in the first month alone. The ROI speaks for itself.",
    author: "Sarah Chen",
    role: "CEO at TechStart",
    rating: 5
  },
  {
    quote: "The attention to detail is unmatched. Every interaction feels intentional and polished. Our users constantly compliment the experience.",
    author: "Marcus Rodriguez",
    role: "Founder at GrowthLab",
    rating: 5
  },
  {
    quote: "Finally, a designer who understands both aesthetics and business goals. The site they built has become our most powerful sales tool.",
    author: "Emily Thompson",
    role: "CMO at Innovate Co.",
    rating: 5
  },
];

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleCardClick = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getCardStyle = (index: number) => {
    const position = (index - activeIndex + testimonials.length) % testimonials.length;
    
    if (position === 0) {
      // Front card
      return {
        transform: 'translateX(0) scale(1)',
        zIndex: 30,
        opacity: 1,
      };
    } else if (position === 1) {
      // Second card (behind right)
      return {
        transform: 'translateX(40px) scale(0.95)',
        zIndex: 20,
        opacity: 0.7,
      };
    } else {
      // Third card (further behind)
      return {
        transform: 'translateX(80px) scale(0.9)',
        zIndex: 10,
        opacity: 0.4,
      };
    }
  };

  return (
    <section id="testimonials" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            What <span className="gradient-text">Clients</span> Say
          </h2>
        </div>

        {/* Stacked Cards Container */}
        <div 
          className={`relative h-[400px] md:h-[350px] transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '200ms' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full max-w-2xl mx-auto h-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                onClick={handleCardClick}
                className="absolute inset-0 cursor-pointer transition-all duration-500 ease-out"
                style={getCardStyle(index)}
              >
                <div className="relative bg-card border border-border/50 rounded-3xl p-8 md:p-10 h-full shadow-lg hover:shadow-xl transition-shadow">
                  {/* Quote Icon */}
                  <div className="absolute -top-5 left-8">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md">
                      <Quote className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-4 h-full flex flex-col">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="font-display text-lg md:text-xl font-medium leading-relaxed mb-6 flex-grow">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-lg font-bold text-primary-foreground">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Dots */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Click hint */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          Click card to see next testimonial
        </p>
      </div>
    </section>
  );
}
