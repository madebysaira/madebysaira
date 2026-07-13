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
                Hey there! I’m Sagarika, a 24-year-old freelance AI Video & Image Creator, Visual Designer, and Workflow Consultant based in Tripura, India. Armed with a B.A. Honours background, I operate globally as a one-woman digital production engine executing the entire creative pipeline myself—from high-fashion commercial ad concepts and logos to setting up internal AI content training frameworks for companies.
              </p>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-normal">
                If you need a hyper-realistic short film scene, a striking brand design asset, or a strategic partner to train your team on mastering AI content workflows (leveraging tools like Claude to direct and structure assets)—I don't just prompt it. I build it, teach it, and deploy it.
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

