import { useScrollReveal } from '@/hooks/useScrollReveal';

import airtableLogo from '@/assets/logos/airtable.png';
import boltLogo from '@/assets/logos/bolt.png';
import chatgptLogo from '@/assets/logos/chatgpt.png';
import facebookLogo from '@/assets/logos/facebook.png';
import figmaLogo from '@/assets/logos/figma.png';
import geminiLogo from '@/assets/logos/gemini.png';
import githubLogo from '@/assets/logos/github.png';
import gmailLogo from '@/assets/logos/gmail.png';
import googleCalendarLogo from '@/assets/logos/google-calendar.png';
import googleDriveLogo from '@/assets/logos/google-drive.png';
import lovableLogo from '@/assets/logos/lovable.png';
import notionLogo from '@/assets/logos/notion-2.png';
import pineconeLogo from '@/assets/logos/pinecone.png';
import salesforceLogo from '@/assets/logos/salesforce.png';
import sheetsLogo from '@/assets/logos/sheets.png';
import shopifyLogo from '@/assets/logos/shopify-2.png';
import slackLogo from '@/assets/logos/slack.png';
import zoomLogo from '@/assets/logos/zoom.png';

const logos = [
  { src: airtableLogo, alt: 'Airtable' },
  { src: boltLogo, alt: 'Bolt' },
  { src: chatgptLogo, alt: 'ChatGPT' },
  { src: facebookLogo, alt: 'Facebook' },
  { src: figmaLogo, alt: 'Figma' },
  { src: geminiLogo, alt: 'Gemini' },
  { src: githubLogo, alt: 'GitHub' },
  { src: gmailLogo, alt: 'Gmail' },
  { src: googleCalendarLogo, alt: 'Google Calendar' },
  { src: googleDriveLogo, alt: 'Google Drive' },
  { src: lovableLogo, alt: 'Lovable' },
  { src: notionLogo, alt: 'Notion' },
  { src: pineconeLogo, alt: 'Pinecone' },
  { src: salesforceLogo, alt: 'Salesforce' },
  { src: sheetsLogo, alt: 'Google Sheets' },
  { src: shopifyLogo, alt: 'Shopify' },
  { src: slackLogo, alt: 'Slack' },
  { src: zoomLogo, alt: 'Zoom' },
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

      {/* First Marquee - Right to Left */}
      <div className="relative mb-6">
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex animate-marquee-fast">
          {[...logos, ...logos].map((logo, index) => (
            <div 
              key={`row1-${logo.alt}-${index}`}
              className="flex-shrink-0 mx-8 group cursor-pointer"
            >
              <div className="flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-500">
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
