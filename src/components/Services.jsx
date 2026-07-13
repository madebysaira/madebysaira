import { ArrowUpRight, Cpu, Layers, MessageSquare, Send } from 'lucide-react';
import Reveal from './ui/Reveal';

const getToolIcon = (name) => {
  const cleanName = name.toLowerCase();
  
  if (cleanName.includes('kling')) {
    return (
      <span className="w-5 h-5 flex items-center justify-center bg-white text-black font-mono text-[9px] font-black sharp-border shrink-0">
        K
      </span>
    );
  }
  if (cleanName.includes('higgsfield')) {
    return (
      <img 
        src="https://higgsfield.ai/favicon.ico" 
        alt="" 
        className="w-5 h-5 object-contain shrink-0" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  if (cleanName.includes('veo')) {
    return (
      <span className="w-5 h-5 flex items-center justify-center bg-red-600 text-white font-mono text-[9px] font-black sharp-border shrink-0">
        V
      </span>
    );
  }
  if (cleanName.includes('atlabs')) {
    return (
      <img 
        src="https://atlabs.ai/favicon.ico" 
        alt="" 
        className="w-5 h-5 object-contain shrink-0" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  if (cleanName.includes('openart')) {
    return (
      <img 
        src="https://openart.ai/favicon.ico" 
        alt="" 
        className="w-5 h-5 object-contain shrink-0" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  if (cleanName.includes('photoshop')) {
    return (
      <span className="w-5 h-5 flex items-center justify-center bg-[#001E36] text-[#00C8FF] border border-[#00C8FF]/30 font-sans font-bold text-[9px] select-none sharp-border shrink-0">
        Ps
      </span>
    );
  }
  if (cleanName.includes('react')) {
    return (
      <img 
        src="https://react.dev/favicon.ico" 
        alt="" 
        className="w-5 h-5 object-contain shrink-0" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  if (cleanName.includes('tailwind')) {
    return (
      <img 
        src="https://tailwindcss.com/favicons/favicon.ico" 
        alt="" 
        className="w-5 h-5 object-contain shrink-0" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  if (cleanName.includes('vite')) {
    return (
      <img 
        src="https://vite.dev/logo.svg" 
        alt="" 
        className="w-5 h-5 object-contain shrink-0" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  if (cleanName.includes('claude')) {
    return (
      <img 
        src="https://www.anthropic.com/favicon.ico" 
        alt="" 
        className="w-5 h-5 object-contain shrink-0" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  if (cleanName.includes('n8n')) {
    return (
      <img 
        src="https://n8n.io/favicon.ico" 
        alt="" 
        className="w-5 h-5 object-contain shrink-0" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  if (cleanName.includes('telegram')) {
    return (
      <img 
        src="https://telegram.org/favicon.ico" 
        alt="" 
        className="w-5 h-5 object-contain shrink-0" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  if (cleanName.includes('whatsapp')) {
    return (
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="" 
        className="w-5 h-5 object-contain shrink-0" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  if (cleanName.includes('tata') || cleanName.includes('analytics') || cleanName.includes('genai')) {
    return (
      <img 
        src="https://www.tata.com/favicon.ico" 
        alt="" 
        className="w-5 h-5 object-contain shrink-0" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  return null;
};

export default function Services() {
  const services = [
    {
      id: '01',
      title: 'High-End Creative Direction & AI Visuals',
      description: 'I command cutting-edge generative video and image models to craft cinematic narratives, premium commercial spec ads, and high-impact visual design assets.',
      features: [
        <span>Commercial Concepts (Tanishq, Horlicks, Campco)</span>,
        <span>Brand Identity & Socials (<a href="https://www.instagram.com/hornbill223?igsh=MXZ1a3hjMmxiOXl6Zg==" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Hornbill Restaurant</a>)</span>,
        <span>Cinematic AI Sequences (<a href="https://www.instagram.com/madeby.saira" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">@madeby.saira</a>)</span>
      ],
      tools: [
        { name: 'Kling AI', link: 'https://klingai.com/' },
        { name: 'Higgsfield', link: 'https://higgsfield.ai/' },
        { name: 'Veo 3' },
        { name: 'Atlabs.ai', link: 'https://atlabs.ai/' },
        { name: 'OpenArt.ai', link: 'https://openart.ai/' },
        { name: 'Photoshop Wizardry' }
      ],
      icon: <Layers size={20} className="text-white" />
    },
    {
      id: '02',
      title: 'Interactive Frontend Production',
      description: 'I love transforming creative, static brand briefs into fully functional, high-conversion web experiences.',
      features: [
        <span>Personality Drinks Web App</span>,
        <span>Custom CSS Animation & Live Particles</span>,
        <span>Deep-linked Mobile UPI Intents</span>
      ],
      tools: [
        { name: 'React' },
        { name: 'Tailwind CSS' },
        { name: 'Vite' }
      ],
      icon: <Cpu size={20} className="text-white" />
    },
    {
      id: '03',
      title: 'AI Training & Workflow Integration',
      description: 'Because tools are useless without a strategy, I map out tech pipelines and upskill teams to integrate AI seamlessly into their operations.',
      features: [
        <span>Corporate Training & Consulting Sessions</span>,
        <span>Claude for Directing & Content Management</span>,
        <span>Tata GenAI Data Analytics Certified</span>,
        <span>n8n Telegram Reminder Bot & WhatsApp Hub</span>
      ],
      tools: [
        { name: 'Claude', link: 'https://www.anthropic.com/claude' },
        { name: 'n8n', link: 'https://n8n.io/' },
        { name: 'Telegram Bot API' },
        { name: 'WhatsApp Channel' },
        { name: 'Tata GenAI' }
      ],
      icon: <MessageSquare size={20} className="text-white" />
    }
  ];

  const experiments = [
    {
      title: 'n8n Reminder Bot',
      description: 'A personal experiment where I tinkered with n8n orchestration to build and wire an automatic reminder bot inside Telegram.',
      link: 'https://t.me/madeby_saira_bot',
      tag: 'n8n + Telegram API',
      icon: <Send size={16} />,
      logo: 'https://www.google.com/s2/favicons?domain=n8n.io&sz=128'
    },
    {
      title: 'WhatsApp Photoshoot Prompt Hub',
      description: 'Built a specialized prompt channel sharing custom engine strings for realistic human generation, mastering prompting & community distribution.',
      link: 'https://whatsapp.com/channel/0029Vb68gUsCnA7lQPkhYw45',
      tag: 'Prompt Engineering',
      icon: <MessageSquare size={16} />,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
    }
  ];

  return (
    <section 
      id="services" 
      className="px-6 md:px-16 lg:pl-32 xl:pl-40 py-24 border-t border-cosmic-border"
    >
      <h1 className="sr-only">Services of Sagarika Sultana</h1>
      <h2 className="sr-only">Services List</h2>
      
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">
            // My Expertise & Integrations
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Pillars of Value
          </h2>
        </div>

        {/* Services Split List */}
        <div className="mb-20">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pt-12 border-t border-cosmic-border first:border-t-0"
            >
              {/* Left Column: Number & Icon */}
              <div className="lg:col-span-2 flex items-center lg:items-start justify-start lg:flex-col gap-4 lg:gap-6">
                <span className="text-4xl lg:text-6xl font-mono text-slate-700 font-bold">
                  {service.id}
                </span>
                <div className="w-12 h-12 border border-cosmic-border flex items-center justify-center">
                  {service.icon}
                </div>
              </div>

              {/* Middle Column: Title & Description */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-normal">
                  {service.description}
                </p>
                
                {service.tools && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                    <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                      // Mastered Toolkit
                    </span>
                    <div className="flex flex-wrap gap-2.5 items-center">
                      {service.tools.map((tool, tIdx) => {
                        const icon = getToolIcon(tool.name);
                        return (
                          <a 
                            key={tIdx} 
                            href={tool.link || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-cosmic-navy/40 hover:border-white/20 hover:bg-cosmic-navy/80 text-xs font-mono text-slate-300 hover:text-white transition-all sharp-border ${!tool.link && 'pointer-events-none'}`}
                          >
                            {icon}
                            <span>{tool.name}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Key Focus Areas */}
              <div className="lg:col-span-4 flex flex-col gap-5 justify-center">
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-3">
                    Focus Areas
                  </p>
                  <ul className="flex flex-col gap-2">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs font-mono text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Clients & Freelance Hustle */}
        <div className="pt-16 border-t border-cosmic-border">
          <div className="mb-10">
            <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">
              // Proven Track Record
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
              Global Clients & Freelance Hustle
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal className="h-full">
              <a href="https://www.houseofshafaq.com/" target="_blank" rel="noopener noreferrer" className="block p-6 sharp-border bg-cosmic-navy/40 hover:bg-cosmic-navy/80 hover:border-white/30 transition-all duration-300 h-full relative z-10">
                <div className="h-10 mb-4 flex items-center">
                  <img src="https://framerusercontent.com/images/GLlzFcsDUzJfJaTbESMuOvceUPY.svg?width=375&height=375" alt="House of Shafaq" className="h-full w-auto max-w-[150px] object-contain" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-1.5">House of Shafaq <ArrowUpRight size={14} className="opacity-50" /></h4>
                <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">Dubai</p>
                <p className="text-slate-300 text-xs md:text-sm mt-3 leading-relaxed font-sans font-normal">
                  Delivered premium visual assets and generative creative direction.
                </p>
              </a>
            </Reveal>

            <Reveal delay={0.1} className="h-full">
              <a href="https://lab.glitchberry.co/" target="_blank" rel="noopener noreferrer" className="block p-6 sharp-border bg-cosmic-navy/40 hover:bg-cosmic-navy/80 hover:border-white/30 transition-all duration-300 h-full relative z-10">
                <div className="h-10 mb-4 flex items-center">
                  <span className="text-2xl font-black tracking-tighter text-white opacity-80 uppercase">Glitchberry</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-1.5">Glitchberry <ArrowUpRight size={14} className="opacity-50" /></h4>
                <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">Bangalore</p>
                <p className="text-slate-300 text-xs md:text-sm mt-3 leading-relaxed font-sans font-normal">
                  Collaborated on cutting-edge digital aesthetics and dynamic visual storytelling for modern web experiences.
                </p>
              </a>
            </Reveal>

            <Reveal delay={0.2} className="h-full">
              <a href="https://www.fiverr.com/" target="_blank" rel="noopener noreferrer" className="block p-6 sharp-border bg-cosmic-navy/40 hover:bg-cosmic-navy/80 hover:border-white/30 transition-all duration-300 h-full relative z-10">
                <div className="h-10 mb-4 flex items-center">
                  <img src="https://www.fiverr.com/favicon.ico" alt="Fiverr" className="h-full w-auto max-w-[150px] object-contain" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-1.5">Fiverr <ArrowUpRight size={14} className="opacity-50" /></h4>
                <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">Global</p>
                <p className="text-slate-300 text-xs md:text-sm mt-3 leading-relaxed font-sans font-normal">
                  Top-rated freelance work handling bespoke designs and AI video campaigns.
                </p>
              </a>
            </Reveal>
          </div>
        </div>

        {/* Orchestrations & Channels Sub-section */}
        <div className="pt-16 border-t border-cosmic-border mt-16">
          <div className="mb-10">
            <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">
              // Custom Tools & Orchestration Labs
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
              Orchestrations & Live Feeds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiments.map((exp, index) => (
              <Reveal key={index} delay={index * 0.1} className="h-full">
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full p-8 sharp-border bg-cosmic-navy/40 hover:bg-cosmic-navy/80 hover:border-white/30 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <img src={exp.logo} alt={exp.title} className="w-8 h-8 rounded-[4px] object-contain" />
                    <span className="text-[10px] font-mono px-2 py-0.5 border border-white/20 text-slate-400 uppercase">
                      {exp.tag}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-none border border-white/25 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white transition-all duration-300">
                    {exp.icon}
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-1.5 group-hover:text-white/90">
                  {exp.title} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-sans font-normal">
                  {exp.description}
                </p>
              </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
