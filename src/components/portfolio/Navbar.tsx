import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const navLinks = [
  { label: 'Solutions', hasDropdown: true },
  { label: 'Blog', href: '#about' },
  { label: 'How it works', href: '#services' },
  { label: 'Pricing', href: '#projects' },
  { label: 'AI Agent', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="font-display font-bold text-2xl text-foreground tracking-tight">
            AitomationZ<span className="text-primary">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 px-6 py-2 rounded-full bg-card border border-border">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => link.href && scrollToSection(link.href)}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative p-2.5 rounded-full bg-card border border-border hover:bg-muted transition-all duration-300 group overflow-hidden"
                aria-label="Toggle theme"
              >
                <div className="relative w-5 h-5">
                  <Sun className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-500 ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
                  <Moon className={`absolute inset-0 w-5 h-5 text-primary transition-all duration-500 ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
                </div>
              </button>
            )}
            <button 
              onClick={() => scrollToSection('#contact')}
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-accent transition-colors"
            >
              Book a Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => link.href && scrollToSection(link.href)}
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-border flex flex-col gap-3">
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="mx-4 py-3 flex items-center justify-center gap-2 bg-card border border-border text-foreground text-sm font-medium rounded-full hover:bg-muted transition-colors"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="w-4 h-4 text-amber-500" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 text-primary" />
                        Dark Mode
                      </>
                    )}
                  </button>
                )}
                <button 
                  onClick={() => scrollToSection('#contact')}
                  className="mx-4 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-accent transition-colors"
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
