import { ArrowLeft, Printer, Globe, Mail } from 'lucide-react';

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

export default function Resume({ onBack }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="min-h-screen px-6 md:px-16 lg:pl-32 xl:pl-40 py-24 border-t border-cosmic-border relative bg-cosmic-void text-slate-100 print-reset-layout">
      
      {/* Navigation & Actions Header */}
      <div className="max-w-4xl mx-auto mb-10 flex justify-between items-center no-print">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white text-xs font-mono tracking-widest uppercase transition-all duration-300 bg-white/5 text-white hover:bg-white hover:text-black focus:outline-none"
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </button>

        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white text-xs font-mono tracking-widest uppercase transition-all duration-300 bg-white/5 text-white hover:bg-white hover:text-black focus:outline-none"
        >
          <Printer size={14} /> Print / Save PDF
        </button>
      </div>

      {/* Main Resume Sheet */}
      <div className="max-w-4xl mx-auto bg-cosmic-navy/40 sharp-border p-8 md:p-12 print-reset-layout print-text-dark print-border-muted">
        
        {/* Document Header */}
        <div className="border-b border-white/10 pb-8 mb-8 print-header-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print-row">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase print-name">
                Sagarika Sultana
              </h1>
              <p className="text-sm font-mono tracking-widest text-slate-400 uppercase mt-2 print-subtitle">
                AI Video & Image Creator // Visual Designer // Workflow Consultant
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs font-mono text-slate-400 items-start md:items-end print-contact-info">
              <span>Tripura, India // Operating Globally</span>
              <a 
                href="mailto:madebysaira@proton.me" 
                className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 print-text-dark"
              >
                madebysaira@proton.me <Mail size={10} />
              </a>
              <a
                href="https://www.madebysaira.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 print-text-dark"
              >
                madebysaira.me <Globe size={10} />
              </a>
              <a 
                href="https://www.linkedin.com/in/sagarika-sultana-751600311" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200 flex items-center gap-1 print-text-dark"
              >
                LinkedIn <LinkedinIcon size={10} />
              </a>
              <a 
                href="https://www.instagram.com/madeby.saira" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200 flex items-center gap-1 print-text-dark"
              >
                Instagram <InstagramIcon size={10} />
              </a>
            </div>
          </div>
        </div>

        {/* Resume Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 print-grid">
          
          {/* Left Column: Summary, Philosophy, Skills, Education */}
          <div className="md:col-span-4 flex flex-col gap-8 print-col-4">
            
            {/* Professional Profile */}
            <div>
              <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 print-section-title">
                // Profile Summary
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed print-text-dark">
                Freelance generative media director, designer, and workflow consultant. I run complete production pipelines on my own, from commercial concepts and visual direction to interactive frontends and light automation. Certified in GenAI Data Analytics, with a Philosophy degree that taught me to think in clear systems and pick up new tools fast.
              </p>
            </div>

            {/* Philosophy */}
            <div>
              <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 print-section-title">
                // Philosophy
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed italic border-l border-white/20 pl-3 print-text-muted print-border-muted">
                "Figure it out velocity. The tools shift every week, so my real asset is how quickly I learn and how happily I jump straight in."
              </p>
            </div>

            {/* AI Video Tools */}
            <div>
              <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 print-section-title">
                // AI Video Toolkit
              </h2>
              <ul className="flex flex-col gap-1.5 text-xs text-slate-300 font-mono print-text-dark">
                <li>• Kling AI (Video Generation)</li>
                <li>• Higgsfield AI (Seedance 2.0)</li>
                <li>• Runway Gen-3</li>
                <li>• Luma Dream Machine</li>
                <li>• Veo 3</li>
                <li>• OpenArt.ai</li>
                <li>• Atlabs.ai (Video Editing)</li>
              </ul>
            </div>

            {/* Image & Design Stack */}
            <div>
              <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 print-section-title">
                // Image Synthesis & Design
              </h2>
              <ul className="flex flex-col gap-1.5 text-xs text-slate-300 font-mono print-text-dark">
                <li>• Midjourney (Prompt Engine)</li>
                <li>• Stable Diffusion</li>
                <li>• OpenArt.ai (Visual Synthesis)</li>
                <li>• ChatGPT (DALL-E)</li>
                <li>• Gemini (Imagen)</li>
                <li>• Higgsfield</li>
                <li>• Photoshop & Illustrator</li>
                <li>• Brand System Typography</li>
              </ul>
            </div>

            {/* Frontend & Automation */}
            <div>
              <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 print-section-title">
                // Tech & Automation
              </h2>
              <ul className="flex flex-col gap-1.5 text-xs text-slate-300 font-mono print-text-dark">
                <li>• React & Vite</li>
                <li>• Tailwind CSS (v4 layout)</li>
                <li>• n8n Workflow Orchestration</li>
                <li>• Telegram Bot API</li>
                <li>• Claude (Creative Directing & Content Management)</li>
              </ul>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 print-section-title">
                // Education
              </h2>
              <div className="border-l border-white/10 pl-3 print-border-muted">
                <h3 className="text-xs font-bold text-white uppercase print-item-title">
                  Women's College, Agartala
                </h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5 print-text-muted">
                  B.A. Honours in Philosophy
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Experience, Spec Campaigns, Labs */}
          <div className="md:col-span-8 flex flex-col gap-8 print-col-8">
            
            {/* Experience / Projects */}
            <div>
              <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-4 print-section-title">
                // Commercial Spec Campaigns & Web Apps
              </h2>
              
              <div className="flex flex-col gap-6 print-col-gap">
                
                {/* Tanishq Jewellery */}
                <div className="border-l border-white/10 pl-4 print-border-muted print-avoid-break">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider print-item-title">
                      Tanishq Jewellery Spec Ad Campaign
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 print-text-muted">2026</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1 print-text-muted">Creative Director & Generative Media Creator</p>
                  <ul className="list-disc pl-4 text-xs text-slate-300 mt-2 space-y-1 print-item-desc">
                    <li>Designed a premium spec commercial that blends traditional Indian couture with close up, jewel lit product shots.</li>
                    <li>Used text to video and image to video pipelines to produce the whole piece, cutting production time by roughly 80 percent versus a physical studio shoot.</li>
                  </ul>
                </div>

                {/* Horlicks Pro Fitness */}
                <div className="border-l border-white/10 pl-4 print-border-muted print-avoid-break">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider print-item-title">
                      Horlicks Pro Fitness Spec Campaign
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 print-text-muted">2026</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1 print-text-muted">Visual Concept Artist & Video Editor</p>
                  <ul className="list-disc pl-4 text-xs text-slate-300 mt-2 space-y-1 print-item-desc">
                    <li>Produced athletic motion campaigns and strength training loops using current generative models that keep the physics believable.</li>
                    <li>Handled the frame by frame editing, sound layout, and speed ramps that hold the story together.</li>
                  </ul>
                </div>

                {/* Campa Cola */}
                <div className="border-l border-white/10 pl-4 print-border-muted print-avoid-break">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider print-item-title">
                      Campa Cola Retro Spec Campaign
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 print-text-muted">2026</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1 print-text-muted">AI Video Editor</p>
                  <ul className="list-disc pl-4 text-xs text-slate-300 mt-2 space-y-1 print-item-desc">
                    <li>Designed an eight second spec concept with a vintage feel, taking it from flat layout sketches to a finished motion piece.</li>
                  </ul>
                </div>

                {/* Personality Drinks Web App */}
                <div className="border-l border-white/10 pl-4 print-border-muted print-avoid-break">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider print-item-title">
                      It's Juicy World, Interactive Quiz Web App
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 print-text-muted">2026</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1 print-text-muted">Lead AI Developer & Frontend Architect</p>
                  <ul className="list-disc pl-4 text-xs text-slate-300 mt-2 space-y-1 print-item-desc">
                    <li>Built and shipped an interactive five question wellness quiz with React, Tailwind CSS, and Vite (personalitydrinks.netlify.app).</li>
                    <li>Turned each set of answers into a drink recommendation, matching someone's routine to a custom organic beverage.</li>
                  </ul>
                </div>

                {/* Hornbill Branding */}
                <div className="border-l border-white/10 pl-4 print-border-muted print-avoid-break">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider print-item-title">
                      Hornbill Restaurant, Brand Identity System
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 print-text-muted">2026</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1 print-text-muted">Lead Brand & Social Designer</p>
                  <ul className="list-disc pl-4 text-xs text-slate-300 mt-2 space-y-1 print-item-desc">
                    <li>Designed the full brand styling, colour guidelines, and social grid for one of Agartala's best known restaurants (instagram.com/hornbill223).</li>
                    <li>Created and scheduled the food concepts and promo graphics, using generative imaging to keep the whole feed consistent.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Consulting & Orchestrations */}
            <div>
              <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-4 print-section-title">
                // Workflow Consulting & Custom Automation
              </h2>
              
              <div className="flex flex-col gap-6 print-col-gap">
                
                {/* Corporate Training */}
                <div className="border-l border-white/10 pl-4 print-border-muted print-avoid-break">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider print-item-title">
                    Corporate AI Workflow Consulting & Upskilling
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed print-item-desc">
                    Run hands on workshops that help teams fold generative media (Kling AI, Higgsfield, Stable Diffusion, Photoshop Generative Fill) into the design work they already do, so they genuinely move faster.
                  </p>
                </div>

                {/* Prompt Hub */}
                <div className="border-l border-white/10 pl-4 print-border-muted print-avoid-break">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider print-item-title">
                    WhatsApp Photoshoot Prompt Community
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed print-item-desc">
                    Started and still run a channel of more than 100 prompt writers, where I share detailed, tested prompts for realistic people and fashion photography.
                  </p>
                </div>

                {/* n8n Bot */}
                <div className="border-l border-white/10 pl-4 print-border-muted print-avoid-break">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider print-item-title">
                    Telegram API Event Automations (n8n Lab)
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed print-item-desc">
                    Built custom event schedulers with n8n and the Telegram Bot API to handle client notifications and routine reminders on their own.
                  </p>
                </div>

              </div>
            </div>

            {/* Global Clients & Freelance */}
            <div>
              <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-4 print-section-title">
                // Global Client Engagements
              </h2>
              
              <div className="flex flex-col gap-6 print-col-gap">
                
                {/* House of Shafaq */}
                <div className="border-l border-white/10 pl-4 print-border-muted print-avoid-break">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider print-item-title">
                    House of Shafaq (Dubai)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1 print-text-muted">Generative Creative Direction</p>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed print-item-desc">
                    Built premium visual concepts and digital assets for luxury fashion campaigns.
                  </p>
                </div>

                {/* Glitchberry */}
                <div className="border-l border-white/10 pl-4 print-border-muted print-avoid-break">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider print-item-title">
                    Glitchberry (Bangalore)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1 print-text-muted">Visual Storytelling & Aesthetics</p>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed print-item-desc">
                    Collaborated on visual branding campaigns, editing workflows, and cinematic storytelling formats.
                  </p>
                </div>

                {/* Fiverr */}
                <div className="border-l border-white/10 pl-4 print-border-muted print-avoid-break">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider print-item-title">
                    Top-Rated Freelancer (Fiverr Network)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1 print-text-muted">Global Operations</p>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed print-item-desc">
                    Deliver generative content, custom icons, and full AI video campaigns for clients worldwide, with the ratings to back it up.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
