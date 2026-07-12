import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { Calendar } from 'lucide-react';

export default function ContactCal() {

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: '15min' });
        cal('ui', {
          styles: {
            branding: {
              brandColor: '#060612',
            },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      } catch (err) {
        console.error('Failed to load Cal.com API:', err);
      }
    })();
  }, []);

  return (
    <section 
      id="booking" 
      className="px-6 md:px-16 lg:pl-32 xl:pl-40 py-24 md:py-32 border-t border-cosmic-border flex items-center"
    >
      <h1 className="sr-only">Contact Sagarika Sultana</h1>
      <h2 className="sr-only">Scheduling Console</h2>
      
      <div className="max-w-4xl">
        <div className="mb-10 text-left">
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">
            // Ready to Collaborate?
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase mb-6 text-white">
            Let's Talk.
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mb-10 font-sans font-normal">
            Whether you need to set up a cutting-edge AI pipeline, need high-end cinematic visuals, or just want to brainstorm speculative ad concepts—I'm ready to dive in. Select a time slot that works for you, and let's get building. No complex forms required.
          </p>

          <button 
            data-cal-namespace="15min"
            data-cal-link="sagarika-sultana-jku31p/15min"
            data-cal-config='{"layout":"month_view"}'
            className="group px-8 py-4 sharp-button font-mono text-sm tracking-wider uppercase flex items-center gap-3 cursor-pointer bg-cosmic-navy text-white border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 focus:outline-none"
          >
            <Calendar size={18} className="group-hover:animate-bounce" />
            Book a 15-Min Session
          </button>
        </div>
      </div>
    </section>
  );
}
