import { useState, useRef } from 'react';
import { Globe } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';
import Reveal from './ui/Reveal';

/* ─── Icons ─── */
const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="none">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);


/* ════════════════════════════════════════════
   Custom Video Player — dark, minimal, premium
   Plays LinkedIn CDN videos directly.
   ════════════════════════════════════════════ */
function VideoCard({ post }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (playing) {
      hideTimer.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
    setShowControls(true);
  };

  return (
    <SpotlightCard className="w-full h-full flex flex-col group p-4 bg-cosmic-navy/30 border border-white/10 hover:border-white/25 transition-all duration-300" spotlightColor="rgba(120, 160, 255, 0.18)">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-sm font-bold text-white tracking-tight mb-1">
          {post.title}
        </h3>
        <p className="text-[10px] text-slate-400 font-mono tracking-wide">
          {post.subtitle}
        </p>
      </div>

      {/* Video Container */}
      <div
        className="relative w-full overflow-hidden sharp-border bg-black mb-4 cursor-pointer"
        style={{ aspectRatio: `${post.width || 720} / ${post.height || 1280}` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => playing && setShowControls(false)}
        onClick={togglePlay}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') togglePlay(); }}
        role="button"
        tabIndex={0}
        aria-label={playing ? 'Pause video' : 'Play video'}
      >
        <video
          ref={videoRef}
          src={post.videoUrl}
          poster={post.poster}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />

        {/* Play/Pause Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: playing ? 'transparent' : 'rgba(0,0,0,0.35)' }}
        >
          {!playing && (
            <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all duration-200 pl-1">
              <PlayIcon />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 px-3 pb-2 pt-8 transition-opacity duration-300 ${
            showControls && playing ? 'opacity-100' : playing ? 'opacity-0' : 'opacity-0'
          }`}
          style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}
        >
          <div
            className="w-full h-1 bg-white/20 cursor-pointer group/bar"
            onClick={(e) => { e.stopPropagation(); handleSeek(e); }}
            role="slider"
            aria-label="Video progress"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
          >
            <div
              className="h-full bg-white transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto w-full py-2.5 border border-white/15 hover:border-white font-mono text-2xs tracking-widest uppercase flex items-center justify-center gap-1.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-300"
      >
        View on LinkedIn <LinkedinIcon size={10} />
      </a>
    </SpotlightCard>
  );
}

/* ════════════════════════════════════════════
   Instagram Reel Card — iframe with dark mask
   ════════════════════════════════════════════ */
function InstagramCard({ reel }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <SpotlightCard className="w-full h-full flex flex-col group p-4 bg-cosmic-navy/30 border border-white/10 hover:border-white/25 transition-all duration-300" spotlightColor="rgba(120, 160, 255, 0.18)">
      {/* Header */}
      <div className="mb-3 text-center">
        <h3 className="text-sm font-bold text-white tracking-tight mb-1">
          {reel.title}
        </h3>
        <p className="text-[10px] text-slate-400 font-mono tracking-wide">
          {reel.subtitle}
        </p>
      </div>

      {/* Instagram Embed */}
      <div
        className="relative w-full overflow-hidden sharp-border bg-white mb-4 mx-auto"
        style={{ height: 520 }}
      >
        {/* Loading skeleton */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/80 z-0">
            <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-white/40 animate-spin" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              Loading…
            </span>
          </div>
        )}

        <iframe
          src={reel.embedUrl}
          width="400"
          height="520"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          title={reel.title}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: '100%',
            border: 0,
            overflow: 'hidden',
          }}
        />

        {/* Bottom gradient mask — blends clip edge into dark card */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: 56,
            background: 'linear-gradient(to bottom, transparent, #010103)',
          }}
        />
      </div>

      {/* CTA */}
      <a
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto w-full py-2.5 border border-white/15 hover:border-white font-mono text-2xs tracking-widest uppercase flex items-center justify-center gap-1.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-300"
      >
        Watch on Instagram <InstagramIcon size={10} />
      </a>
    </SpotlightCard>
  );
}

/* ════════════════════════════════════════════
   AI Web App Card
   ════════════════════════════════════════════ */
function WebAppCard({ app }) {
  return (
    <SpotlightCard className="w-full h-full flex flex-col group p-4 bg-cosmic-navy/30 border border-white/10 hover:border-white/25 transition-all duration-300" spotlightColor="rgba(120, 160, 255, 0.18)">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-sm font-bold text-white tracking-tight mb-1">
            {app.title}
          </h3>
          <p className="text-[10px] text-slate-400 font-mono tracking-wide">
            {app.subtitle}
          </p>
        </div>

        {/* Image Showcase */}
        <div 
          className="relative w-full overflow-hidden sharp-border bg-black mb-4 cursor-pointer aspect-[4/3] flex items-center justify-center"
        >
          {app.imageUrl ? (
            <img 
              src={app.imageUrl} 
              alt={app.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-white text-black flex items-center justify-center font-black text-6xl tracking-tighter transition-transform duration-500 group-hover:scale-105 select-none">
              {app.placeholder || "S*"}
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="px-4 py-2 border border-white bg-black/60 text-white font-mono text-2xs tracking-widest uppercase">
              {app.buttonText || (app.url === '#' ? 'Brand Details' : 'Launch App')}
            </span>
          </div>
        </div>

        {/* Description & Tech Stack */}
        <div className="mb-4">
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {app.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {app.stack.map((tech, tIdx) => (
              <span 
                key={tIdx} 
                className="text-[9px] font-mono px-2 py-0.5 border border-white/10 text-slate-400 bg-white/5 uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href={app.url}
          target={app.url === '#' ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="mt-auto w-full py-2.5 border border-white/15 hover:border-white font-mono text-2xs tracking-widest uppercase flex items-center justify-center gap-1.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-300"
        >
          {app.ctaText || (app.url === '#' ? 'Internal App' : 'Open Web App')} &nbsp;<Globe size={10} />
        </a>
    </SpotlightCard>
  );
}

/* ════════════════════════════════════════════
   Main Portfolio Section
   ════════════════════════════════════════════ */
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const containerRef = useRef(null);

  /* LinkedIn posts — videos downloaded locally from LinkedIn's CDN.
     All are 720×1280 (9:16 portrait). Clicking CTA opens the original post. */
  const linkedinPosts = [
    {
      title: "Tanishq Jewellery Spec Campaign",
      subtitle: "Cinematic Jewelry / Spec Ad Campaign",
      videoUrl: "/videos/tanishq.mp4",
      poster: "/images/posters/tanishq.jpg",
      url: "https://www.linkedin.com/posts/sagarika-sultana-751600311_tanishq-aiadvertising-aivideo-activity-7465417409286344704-v9JY",
      width: 720,
      height: 1280,
    },
    {
      title: "Horlicks Pro Fitness Spec Campaign",
      subtitle: "Fitness Storytelling / Spec Ad Concept",
      videoUrl: "/videos/horlicks.mp4",
      poster: "/images/posters/horlicks.jpg",
      url: "https://www.linkedin.com/posts/sagarika-sultana-751600311_specad-aiadvertising-creativedirection-activity-7465438959947632642-DOwl",
      width: 720,
      height: 1280,
    },
    {
      title: "Campa Cola Spec Campaign",
      subtitle: "8-Second Retro-Modern Ad Concept",
      videoUrl: "/videos/campacola.mp4",
      poster: "/images/posters/campacola.jpg",
      url: "https://www.linkedin.com/posts/sagarika-sultana-751600311_campacola-aiadvertising-aivideo-activity-7465407257623666688-VfiS",
      width: 720,
      height: 1280,
    },
  ];

  const instagramReels = [
    {
      title: "Revenge Part 1",
      subtitle: "Fictional Series Concept / Higgsfield AI",
      embedUrl: "https://www.instagram.com/reel/DXZ0nOQErir/embed/",
      url: "https://www.instagram.com/reel/DXZ0nOQErir/",
    },
    {
      title: "Cinematic Dreamscape",
      subtitle: "Atmospheric Visuals / Higgsfield Seedance 2.0",
      embedUrl: "https://www.instagram.com/reel/DXRIMkqkQXU/embed/",
      url: "https://www.instagram.com/reel/DXRIMkqkQXU/",
    },
    {
      title: "VEXA Character Concept",
      subtitle: "Futuristic VFX Character Transformation",
      embedUrl: "https://www.instagram.com/reel/DXUCLZRElT2/embed/",
      url: "https://www.instagram.com/reel/DXUCLZRElT2/",
    },
  ];

  const aiWebApps = [
    {
      title: "It's Juicy World — Personality Drinks",
      subtitle: "Interactive Fitness Personality Quiz Web App",
      imageUrl: "/images/juicy_world_mockup.png",
      url: "https://personalitydrinks.netlify.app/",
      description: "An engaging 5-question personality engine designed entirely with generative AI tools. Tailored for a local Agartala juice bar to naturally align fitness routines with custom organic beverages.",
      stack: ["React", "Tailwind CSS", "Generative AI", "Vite"],
    },
    {
      title: "Hornbill Restaurant — Brand Identity",
      subtitle: "Social Grid & Visual Branding System",
      imageUrl: "/images/hornbill.png",
      placeholder: "H*",
      url: "https://www.instagram.com/hornbill223",
      buttonText: "View Grid Aesthetics",
      ctaText: "Open Instagram Grid",
      description: "Crafted the comprehensive brand identity and social media layout system for Agartala's popular restaurant. Designed premium visual layouts, culinary assets, and promotional templates to build a unified aesthetic.",
      stack: ["Brand Design", "Social Strategy", "Generative Media", "Figma"],
    }
  ];

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative px-6 md:px-16 lg:pl-32 xl:pl-40 py-24 border-t border-cosmic-border bg-cosmic-void bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]"
    >

      <div className="max-w-6xl">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">
              // Creative Work &amp; Social Reach
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
              Creative Showcase
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 border border-white/10 p-1 bg-cosmic-navy/60 sharp-border select-none w-full md:w-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'campaigns'
                  ? 'bg-white text-black font-bold'
                  : 'text-slate-400 hover:text-white bg-transparent'
              } focus:outline-none`}
            >
              Campaign Spec Ads
            </button>
            <button
              onClick={() => setActiveTab('reels')}
              className={`shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'reels'
                  ? 'bg-white text-black font-bold'
                  : 'text-slate-400 hover:text-white bg-transparent'
              } focus:outline-none`}
            >
              Cinematic Reels
            </button>
            <button
              onClick={() => setActiveTab('apps')}
              className={`shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'apps'
                  ? 'bg-white text-black font-bold'
                  : 'text-slate-400 hover:text-white bg-transparent'
              } focus:outline-none`}
            >
              AI Web Apps
            </button>
          </div>
        </div>

        {/* ── LinkedIn Campaigns ──
             Uses direct MP4 video from LinkedIn's CDN.
             No more blank iframes. Full aesthetic control. */}
        {activeTab === 'campaigns' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {linkedinPosts.map((post, idx) => (
              <Reveal key={idx} delay={idx * 0.08} className="h-full">
                <VideoCard post={post} />
              </Reveal>
            ))}
          </div>
        )}

        {/* ── Instagram Reels ── */}
        {activeTab === 'reels' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {instagramReels.map((reel, idx) => (
              <Reveal key={idx} delay={idx * 0.08} className="h-full">
                <InstagramCard reel={reel} />
              </Reveal>
            ))}
          </div>
        )}

        {/* ── AI Web Apps ── */}
        {activeTab === 'apps' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiWebApps.map((app, idx) => (
              <Reveal key={idx} delay={idx * 0.08} className="h-full">
                <WebAppCard app={app} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
