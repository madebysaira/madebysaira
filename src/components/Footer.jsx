

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative px-6 md:px-16 lg:pl-32 xl:pl-40 py-12 border-t border-cosmic-border bg-cosmic-void">
      <div className="max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* Copyright */}
        <div className="text-xs text-slate-500 font-mono">
          &copy; {new Date().getFullYear()} SAGARIKA SULTANA. ALL RIGHTS RESERVED.
        </div>

        {/* Back to Top */}
        <div className="flex items-center gap-8">
          <button
            onClick={handleScrollToTop}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleScrollToTop();
              }
            }}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors duration-200 uppercase tracking-widest cursor-pointer"
          >
            // BACK TO TOP
          </button>
        </div>
      </div>

    </footer>
  );
}
