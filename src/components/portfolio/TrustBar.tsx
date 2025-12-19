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
import boltLogo from '@/assets/logos/bolt.png';
import chatgptLogo from '@/assets/logos/chatgpt.png';
import geminiLogo from '@/assets/logos/gemini.png';
import lovableLogo from '@/assets/logos/lovable.png';
import notionLogo from '@/assets/logos/notion.png';
import shopifyLogo from '@/assets/logos/shopify.png';
import whatsapp2Logo from '@/assets/logos/whatsapp-2.png';

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
  { src: boltLogo, alt: 'Bolt' },
  { src: chatgptLogo, alt: 'ChatGPT' },
  { src: geminiLogo, alt: 'Gemini' },
  { src: lovableLogo, alt: 'Lovable' },
  { src: notionLogo, alt: 'Notion' },
  { src: shopifyLogo, alt: 'Shopify' },
  { src: whatsapp2Logo, alt: 'WhatsApp' },
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
              <div className="flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-500 group-hover:bg-primary/10 group-hover:shadow-lg group-hover:shadow-primary/20">
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="h-10 w-auto object-contain transition-all duration-500 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-125 group-hover:-translate-y-2 group-hover:drop-shadow-[0_8px_12px_rgba(var(--primary),0.3)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
