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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 400);
  };

  const handleCardClick = () => {
    handleNext();
  };

  const getCardStyle = (index: number) => {
    const position = (index - activeIndex + testimonials.length) % testimonials.length;
    
    if (position === 0) {
      // Front card
      return {
        transform: isAnimating 
          ? 'translateX(-60px) translateY(-40px) scale(0.9) rotate(-3deg)' 
          : 'translateX(0) translateY(0) scale(1) rotate(0deg)',
        zIndex: 30,
        opacity: isAnimating ? 0.5 : 1,
      };
    } else if (position === 1) {
      // Second card (behind left-top)
      return {
        transform: isAnimating
          ? 'translateX(0) translateY(0) scale(1) rotate(0deg)'
          : 'translateX(-30px) translateY(-20px) scale(0.95) rotate(-2deg)',
        zIndex: isAnimating ? 30 : 20,
        opacity: isAnimating ? 1 : 0.8,
      };
    } else {
      // Third card (further behind left-top)
      return {
        transform: isAnimating
          ? 'translateX(-30px) translateY(-20px) scale(0.95) rotate(-2deg)'
          : 'translateX(-60px) translateY(-40px) scale(0.9) rotate(-4deg)',
        zIndex: 10,
        opacity: isAnimating ? 0.8 : 0.5,
      };
    }
  };

  const getCardBorderColor = (index: number) => {
    const position = (index - activeIndex + testimonials.length) % testimonials.length;
    const colors = [
      'border-primary/80', // Front - primary pink
      'border-accent/60',  // Second - accent
      'border-muted/40',   // Third - muted
    ];
    return colors[position] || colors[2];
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
          className={`relative h-[420px] md:h-[380px] transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '200ms' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full max-w-2xl mx-auto h-full pt-12 pl-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                onClick={handleCardClick}
                className={`absolute inset-0 mt-12 ml-16 cursor-pointer transition-all duration-500 ease-out`}
                style={getCardStyle(index)}
              >
                <div className={`relative bg-card border-2 ${getCardBorderColor(index)} rounded-3xl p-8 md:p-10 h-full shadow-xl transition-all duration-500`}>
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
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) setActiveIndex(index);
                }}
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

        {/* Bottom Video */}
        <div className="mt-16 md:mt-24 w-full max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            >
              <source src="/videos/testimonials-crowd.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
