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
                "The tools change almost every week, so the most useful thing I own is how fast I can learn."
              </p>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-6 text-slate-300 text-sm md:text-base leading-relaxed font-sans font-normal">
              <p>
                I don't really wait around for a course to give me permission. I just start. When I wanted to understand how websites actually work, I sat down and built one from scratch, mistakes and all.
              </p>
              <p>
                I pick new things up fast, I'm happy being a beginner for a few days, and I genuinely enjoy taking a messy brief and turning it into a finished, living asset for clients anywhere in the world.
              </p>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
