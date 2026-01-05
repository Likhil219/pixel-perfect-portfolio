import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Play, ShoppingCart, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/portfolio/Navbar';
import { Footer } from '@/components/portfolio/Footer';
import { useState, useEffect, useCallback } from 'react';

const projects = [
  {
    id: 'appointment-booking-automation',
    title: 'Appointment Booking Automation',
    category: 'Healthcare',
    description: 'Complete WhatsApp-based appointment booking system for hospitals and clinics with auto slot checking and reminder automation.',
    gradient: 'from-violet-600 to-indigo-600',
    year: '2024',
    client: 'Multi-Specialty Hospital',
    duration: '6 weeks',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800'
    ],
    features: [
      'WhatsApp appointment booking bot',
      'Auto slot checking & availability',
      'Appointment confirmation messages',
      'Unique appointment ID generation',
      'Reminder messages (WhatsApp / SMS / Call)',
      '24/7 booking availability'
    ],
    results: [
      '80% reduction in manual calling',
      '45% fewer no-shows',
      '24/7 booking availability',
      '3x faster appointment scheduling'
    ],
    technologies: ['WhatsApp Cloud API', 'n8n', 'Node.js', 'PostgreSQL'],
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveLink: '#',
    githubLink: '#'
  },
  {
    id: 'hospital-clinic-automation',
    title: 'Hospital & Clinic Automation',
    category: 'Healthcare',
    description: 'End-to-end hospital management automation including patient registration, scheduling, follow-ups, and billing.',
    gradient: 'from-blue-600 to-cyan-500',
    year: '2024',
    client: 'City Diagnostic Center',
    duration: '8 weeks',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800'
    ],
    features: [
      'Patient registration via WhatsApp',
      'Doctor-wise appointment scheduling',
      'Auto reminders before appointment',
      'Follow-up messages after visit',
      'Lab report notification automation',
      'Billing & invoice auto-generation'
    ],
    results: [
      '60% reduction in admin workload',
      '95% patient satisfaction rate',
      'Zero missed follow-ups',
      'Instant lab report delivery'
    ],
    technologies: ['WhatsApp API', 'Twilio', 'React', 'Supabase', 'n8n'],
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveLink: '#',
    githubLink: '#'
  },
  {
    id: 'whatsapp-business-automation',
    title: 'WhatsApp Business Automation',
    category: 'Business',
    description: 'Complete WhatsApp automation suite with auto-replies, lead qualification, order updates, and broadcast campaigns.',
    gradient: 'from-emerald-500 to-teal-600',
    year: '2024',
    client: 'E-commerce Business',
    duration: '4 weeks',
    images: [
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800'
    ],
    features: [
      'Auto replies to FAQs',
      'Lead qualification bot',
      'Order status updates',
      'Payment reminder messages',
      'Broadcast campaigns (offers, updates)',
      'Customer support automation'
    ],
    results: [
      '90% faster response time',
      '50% increase in lead conversion',
      '24/7 customer support',
      '70% reduction in support tickets'
    ],
    technologies: ['WhatsApp Cloud API', 'Twilio', 'n8n', 'Zapier'],
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveLink: '#',
    githubLink: '#'
  },
  {
    id: 'lead-generation-crm',
    title: 'Lead Generation & CRM Automation',
    category: 'Sales',
    description: 'Automated lead capture, scoring, and follow-up system with CRM integration for service businesses.',
    gradient: 'from-amber-500 to-orange-600',
    year: '2023',
    client: 'Real Estate Agency',
    duration: '5 weeks',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
    ],
    features: [
      'Website form → CRM auto entry',
      'Auto WhatsApp message on new lead',
      'Lead scoring system',
      'Follow-up sequence (Day 1, 3, 7)',
      'Google Sheets / CRM integration',
      'Lead analytics dashboard'
    ],
    results: [
      'Zero missed leads',
      '40% higher conversion rate',
      'Automated follow-up sequences',
      'Complete lead visibility'
    ],
    technologies: ['Zapier', 'HubSpot', 'WhatsApp API', 'Google Sheets'],
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveLink: '#',
    githubLink: '#'
  },
  {
    id: 'voice-call-automation',
    title: 'Voice Call Automation',
    category: 'Advanced',
    description: 'AI-powered voice call automation for appointment confirmations, follow-ups, and feedback collection.',
    gradient: 'from-pink-500 to-rose-600',
    year: '2024',
    client: 'Sales Team',
    duration: '6 weeks',
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800'
    ],
    features: [
      'Appointment confirmation calls',
      'Missed call follow-up',
      'Feedback collection calls',
      'Payment reminder calls',
      'AI voice agents',
      'Call analytics & recordings'
    ],
    results: [
      '85% call completion rate',
      '60% reduction in manual calls',
      'Instant feedback collection',
      '24/7 call availability'
    ],
    technologies: ['Twilio', 'Retell AI', 'Node.js', 'PostgreSQL'],
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveLink: '#',
    githubLink: '#'
  },
  {
    id: 'invoice-payment-automation',
    title: 'Invoice & Payment Automation',
    category: 'Finance',
    description: 'Automated invoice generation, delivery, and payment tracking with reminder automation.',
    gradient: 'from-purple-600 to-violet-600',
    year: '2023',
    client: 'Freelance Agency',
    duration: '3 weeks',
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    ],
    features: [
      'Auto invoice generation',
      'WhatsApp invoice delivery',
      'Payment link sharing',
      'Payment status tracking',
      'Reminder automation for pending payments',
      'Payment analytics'
    ],
    results: [
      '50% faster payments',
      '30% reduction in overdue invoices',
      'Instant invoice delivery',
      'Complete payment visibility'
    ],
    technologies: ['Stripe', 'WhatsApp API', 'n8n', 'React'],
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveLink: '#',
    githubLink: '#'
  },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const images = project?.images || [];

  const nextImage = useCallback(() => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  // Auto-scroll effect
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length, isPaused, nextImage]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/#projects">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            to="/#projects" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                {project.category}
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{project.year}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Client: <span className="text-foreground">{project.client}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Duration: <span className="text-foreground">{project.duration}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View Live Demo
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Buy
                </Button>
              </div>
            </div>
            
            {/* Project Images Carousel */}
            <div 
              className="aspect-video rounded-2xl relative overflow-hidden group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {images.length > 0 ? (
                <>
                  {/* Images */}
                  <div className="relative w-full h-full">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Dots Indicator */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex 
                              ? 'bg-white w-6' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* Fallback gradient if no images */
                <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-8 left-8 w-32 h-32 border border-white/20 rounded-full" />
                    <div className="absolute bottom-8 right-8 w-48 h-48 border border-white/10 rounded-lg rotate-12" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features & Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Features */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <h2 className="font-display text-2xl font-bold mb-6">Features</h2>
              <ul className="space-y-4">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Results */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <h2 className="font-display text-2xl font-bold mb-6">Results</h2>
              <ul className="space-y-4">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-muted-foreground">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Demo Video */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold mb-8 text-center">Demo Video</h2>
          <div className="aspect-video rounded-2xl overflow-hidden bg-card border border-border/50">
            <iframe
              src={project.demoVideo}
              title={`${project.title} Demo`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
      
      {/* Technologies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold mb-8 text-center">Technologies Used</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-6 py-3 bg-card rounded-full border border-border/50 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Want Something Similar?
          </h2>
          <p className="text-muted-foreground mb-8">
            Let's discuss how I can build a custom automation solution for your business.
          </p>
          <Link to="/#contact">
            <Button size="lg">Get in Touch</Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
