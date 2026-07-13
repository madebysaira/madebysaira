import Reveal from './ui/Reveal';

export default function About() {
  return (
    <section 
      id="about" 
      className="px-6 md:px-16 lg:pl-32 xl:pl-40 py-24 border-t border-cosmic-border bg-cosmic-void/20"
    >
      <h1 className="sr-only">About Sagarika Sultana</h1>
      <h2 className="sr-only">Personal Bio</h2>
      
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Heading */}
          <div className="lg:col-span-4 flex flex-col gap-6 md:sticky md:top-32">
            <div>
              <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">
                // The Quick Vibe Check
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none break-words no-hyphens">
                Who Is <br /> Sagarika?
              </h2>
            </div>
          </div>
 
          {/* Right Block: Content & Metrics */}
          <div className="lg:col-span-8 flex flex-col gap-8 text-slate-300 text-sm md:text-base leading-relaxed">
            <Reveal className="flex flex-col gap-6">
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-normal">
                Hi, I'm Sagarika. I'm 24, I live in Tripura, India, and I work with brands all over the world as a freelance AI video and image creator, visual designer, and workflow consultant. My degree is a B.A. Honours in Philosophy, which sounds unrelated until you watch me take a messy brief apart and rebuild it into something that actually ships. I run the whole creative pipeline on my own, from the first commercial concept and logo to the AI content systems I set up inside companies.
              </p>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-normal">
                So if you need a lifelike short film scene, a brand asset that stops the scroll, or someone who can get your team genuinely comfortable with AI workflows, that is my everyday work. I take the whole thing from a rough idea to something real. I design it, build it, teach it, and make sure it still holds up once it is live.
              </p>
            </Reveal>

            {/* Quick Metrics */}
            <Reveal delay={0.1} className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-cosmic-border mt-4">
              <div>
                <p className="text-xs font-mono text-slate-500 uppercase">// Location</p>
                <p className="text-white font-bold mt-1 text-sm md:text-base">Tripura, India</p>
              </div>
              <div>
                <p className="text-xs font-mono text-slate-500 uppercase">// Operations</p>
                <p className="text-white font-bold mt-1 text-sm md:text-base">Global Remote</p>
              </div>
              <div>
                <p className="text-xs font-mono text-slate-500 uppercase">// Stack Focus</p>
                <p className="text-white font-bold mt-1 text-sm md:text-base">Generative Media</p>
              </div>
            </Reveal>
          </div>
 
        </div>
      </div>
    </section>
  );
}

