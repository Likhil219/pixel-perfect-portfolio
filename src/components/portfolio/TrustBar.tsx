import { useScrollReveal } from '@/hooks/useScrollReveal';

import airtable2Logo from '@/assets/logos/airtable2.png';
import facebookLogo from '@/assets/logos/facebook.png';
import githubLogo from '@/assets/logos/github.png';
import gmailLogo from '@/assets/logos/gmail.png';
import googleDriveLogo from '@/assets/logos/google-drive.png';
import slackLogo from '@/assets/logos/slack.png';
import supabaseLogo from '@/assets/logos/supabase.png';
import telegramLogo from '@/assets/logos/telegram.png';
import whatsappLogo from '@/assets/logos/whatsapp.png';

const logos = [
  { src: airtable2Logo, alt: 'Airtable' },
  { src: facebookLogo, alt: 'Facebook' },
  { src: githubLogo, alt: 'GitHub' },
  { src: gmailLogo, alt: 'Gmail' },
  { src: googleDriveLogo, alt: 'Google Drive' },
  { src: slackLogo, alt: 'Slack' },
  { src: supabaseLogo, alt: 'Supabase' },
  { src: telegramLogo, alt: 'Telegram' },
  { src: whatsappLogo, alt: 'WhatsApp' },
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
          {[...logos, ...logos].map((logo, index) => (
            <div 
              key={`${logo.alt}-${index}`}
              className="flex-shrink-0 mx-8 group cursor-pointer"
            >
              <div className="flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 group-hover:bg-card">
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="h-10 w-auto object-contain transition-all duration-300 opacity-70 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
