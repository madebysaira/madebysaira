import { useState } from 'react';
import CatCursor from './components/ui/CatCursor';
import CircularBadge from './components/ui/CircularBadge';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './components/About';
import Velocity from './components/Velocity';
import ContactCal from './components/ContactCal';
import Footer from './components/Footer';
import Resume from './components/Resume';

function App() {
  const [view, setView] = useState('portfolio'); // 'portfolio' or 'resume'

  return (
    <div className="relative min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
      {/* Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 font-mono text-xs z-50 sharp-border"
      >
        Skip to main content
      </a>

      <CatCursor />

      {/* Main Layout Container */}
      <div className="relative w-full">
        {/* Navigation Sidebar */}
        <Sidebar view={view} setView={setView} />

        {/* Core content sections */}
        <main id="main-content" className="w-full flex flex-col">
          {view === 'portfolio' ? (
            <>
              <Hero setView={setView} />
              <Portfolio />
              <Services />
              <About />
              <Velocity />
              <ContactCal />
            </>
          ) : (
            <Resume onBack={() => setView('portfolio')} />
          )}
        </main>

        {/* Page Footer */}
        <Footer />
        
        {/* Fixed Circular Badge */}
        <div className="fixed bottom-6 right-6 z-50 pointer-events-auto hidden md:block origin-bottom-right">
          <CircularBadge text="CREATIVE*STRATEGY*DESIGN*" size={140} />
        </div>
        

      </div>
    </div>
  );
}

export default App;
