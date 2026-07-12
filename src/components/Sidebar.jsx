import { ArrowUpRight } from 'lucide-react';

const InstagramIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Sidebar({ view = 'portfolio', setView }) {
  const scrollToSection = (id) => {
    if (setView && view !== 'portfolio') {
      setView('portfolio');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-20 xl:w-24 flex-col justify-between items-center py-10 z-30 border-r border-cosmic-border bg-cosmic-void/80 backdrop-blur-md no-print">
        {/* Branding Logo */}
        <button 
          className="group cursor-pointer focus:outline-none bg-transparent border-0 p-0" 
          onClick={() => scrollToSection('hero')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') scrollToSection('hero');
          }}
          aria-label="Scroll to top"
        >
          <div className="px-3 py-1.5 border border-white/40 flex items-center justify-center font-mono font-bold text-[10px] tracking-widest text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
            SAIRA
          </div>
        </button>

        {/* Vertical Nav links */}
        <nav className="flex flex-col items-center gap-10 text-[11px] font-mono tracking-widest text-slate-400 select-none">
          <button 
            onClick={() => scrollToSection('portfolio')} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') scrollToSection('portfolio');
            }}
            className="[writing-mode:vertical-lr] rotate-180 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none bg-transparent border-0 p-0 text-left"
          >
            SHOWCASE
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') scrollToSection('services');
            }}
            className="[writing-mode:vertical-lr] rotate-180 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none bg-transparent border-0 p-0 text-left"
          >
            EXPERTISE
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') scrollToSection('about');
            }}
            className="[writing-mode:vertical-lr] rotate-180 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none bg-transparent border-0 p-0 text-left"
          >
            ABOUT
          </button>
        </nav>

        {/* Social Links */}
        <div className="flex flex-col gap-5 text-slate-400">
          <a href="https://www.instagram.com/madeby.saira" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors duration-200">
            <InstagramIcon size={18} />
          </a>
          <a href="https://www.linkedin.com/in/sagarika-sultana-751600311" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors duration-200">
            <LinkedinIcon size={18} />
          </a>
          <a href="https://x.com/madebysaira" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:text-white transition-colors duration-200">
            <TwitterIcon size={18} />
          </a>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 flex justify-between items-center px-6 z-30 border-b border-cosmic-border bg-cosmic-void/80 backdrop-blur-md no-print">
        <button 
          className="font-mono font-bold text-white tracking-widest text-lg cursor-pointer bg-transparent border-0 p-0 text-left focus:outline-none" 
          onClick={() => scrollToSection('hero')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') scrollToSection('hero');
          }}
        >
          SAIRA
        </button>
        
        {/* Contact CTA */}
        <button 
          onClick={() => scrollToSection('booking')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') scrollToSection('booking');
          }}
          className="text-xs px-3 py-1.5 border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black font-mono transition-all duration-300 flex items-center gap-1 focus:outline-none"
        >
          BOOK A CALL <ArrowUpRight size={12} />
        </button>
      </header>
    </>
  );
}
