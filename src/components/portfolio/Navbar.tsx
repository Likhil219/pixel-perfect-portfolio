import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const projects = [
  { id: 'appointment-booking-automation', title: 'Appointment Booking Automation' },
  { id: 'hospital-clinic-automation', title: 'Hospital & Clinic Automation' },
  { id: 'whatsapp-business-automation', title: 'WhatsApp Business Automation' },
  { id: 'lead-generation-crm', title: 'Lead Generation & CRM' },
  { id: 'voice-call-automation', title: 'Voice Call Automation' },
  { id: 'invoice-payment-automation', title: 'Invoice & Payment Automation' },
];

const navLinks = [
  { label: 'Solutions', hasDropdown: true },
  { label: 'Blog', href: '/blog', isRoute: true },
  { label: 'How it works', href: '#services' },
  { label: 'Pricing', href: '#projects' },
  { label: 'AI Agent', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isRoute && link.href) {
      navigate(link.href);
      setIsMobileMenuOpen(false);
    } else if (link.href) {
      scrollToSection(link.href);
    }
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
          <Link to="/" className="font-display font-bold text-2xl text-foreground tracking-tight">
            AitomationZ<span className="text-primary">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 px-6 py-2 rounded-full bg-card border border-border">
              {navLinks.map((link) => (
                <div key={link.label} className="relative" ref={link.hasDropdown ? dropdownRef : undefined}>
                  <button
                    onClick={() => {
                      if (link.hasDropdown) {
                        setIsSolutionsOpen(!isSolutionsOpen);
                      } else {
                        handleNavClick(link);
                      }
                    }}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  
                  {/* Solutions Dropdown */}
                  {link.hasDropdown && isSolutionsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                      <div className="p-2">
                        <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Our Solutions
                        </p>
                        {projects.map((project) => (
                          <Link
                            key={project.id}
                            to={`/project/${project.id}`}
                            onClick={() => setIsSolutionsOpen(false)}
                            className="flex items-center justify-between px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors group"
                          >
                            <span>{project.title}</span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
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
          <div className="md:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <button
                    onClick={() => {
                      if (link.hasDropdown) {
                        setIsSolutionsOpen(!isSolutionsOpen);
                      } else {
                        handleNavClick(link);
                      }
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  
                  {/* Mobile Solutions Dropdown */}
                  {link.hasDropdown && isSolutionsOpen && (
                    <div className="pl-4 mt-1 space-y-1">
                      {projects.map((project) => (
                        <Link
                          key={project.id}
                          to={`/project/${project.id}`}
                          onClick={() => {
                            setIsSolutionsOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          {project.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-2 border-t border-border flex flex-col gap-2">
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
