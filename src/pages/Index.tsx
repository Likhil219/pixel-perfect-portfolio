import { Navbar } from '@/components/portfolio/Navbar';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { TrustBar } from '@/components/portfolio/TrustBar';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { ServicesSection } from '@/components/portfolio/ServicesSection';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { WhyChooseSection } from '@/components/portfolio/WhyChooseSection';
import { TestimonialsSection } from '@/components/portfolio/TestimonialsSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { Footer } from '@/components/portfolio/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
