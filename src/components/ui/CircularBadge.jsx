import { useEffect, useRef } from 'react';

export default function CircularBadge({ text, size = 160 }) {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.innerHTML = text.split('').map(
      (char, i) => `<span style="transform:rotate(${i * (360 / text.length)}deg); position: absolute; left: 50%; top: 0; transform-origin: 0 ${size / 2}px;">${char}</span>`
    ).join('');
  }, [text, size]);

  return (
    <div className="relative flex items-center justify-center rounded-full bg-cosmic-navy/50 backdrop-blur-md text-white font-mono text-[10px] tracking-widest cursor-pointer group" style={{ width: size, height: size }}>
      <div className="absolute inset-0 animate-[spin_15s_linear_infinite] group-hover:animate-[spin_5s_linear_infinite]" ref={textRef} />
    </div>
  );
}
