import Reveal from './ui/Reveal';

export default function Velocity() {
  return (
    <section 
      id="velocity" 
      className="px-6 md:px-16 lg:pl-32 xl:pl-40 py-24 border-t border-cosmic-border bg-cosmic-navy/10"
    >
      <h1 className="sr-only">Sagarika Sultana's Philosophy</h1>
      <h2 className="sr-only">Figure It Out Velocity</h2>
      
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Heading */}
          <div className="lg:col-span-4 flex flex-col gap-6 md:sticky md:top-32">
            <div>
              <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">
                // Creative Philosophy
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none break-words no-hyphens">
                Figure It Out <br /> Velocity
              </h2>
            </div>
          </div>

          {/* Right Block: Manifesto Quote & Description */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Reveal as="blockquote" className="border-l border-white/30 pl-6 py-2 mb-6">
              <p className="text-xl md:text-3xl font-serif italic text-white/90 leading-snug">
                "The digital landscape changes every single week, and my greatest skill is speed-of-learning."
              </p>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-6 text-slate-300 text-sm md:text-base leading-relaxed font-sans font-normal">
              <p>
                I don’t wait for formal training; I jump straight into the trenches. When I wanted to understand how the web works, I sat down and tried to build an entire website from scratch. 
              </p>
              <p>
                I adapt fast, I upskill instantly, and I thrive on taking a chaotic creative brief and turning it into a polished, live asset for clients globally.
              </p>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
