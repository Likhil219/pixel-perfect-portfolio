import { useState, useCallback } from 'react';
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
import { IntroVideo } from '@/components/portfolio/IntroVideo';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleVideoEnd = useCallback(() => {
    setShowIntro(false);
    // Small delay before showing content with animation
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  }, []);

  return (
    <>
      {showIntro && <IntroVideo onVideoEnd={handleVideoEnd} />}
      
      <main 
        className={`min-h-screen bg-background text-foreground overflow-x-hidden transition-all duration-1000 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar />
        <HeroSection isVisible={contentVisible} />
        <TrustBar />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
