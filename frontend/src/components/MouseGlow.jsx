import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function MouseGlow() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
      aria-hidden
      style={{
        background: `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, rgba(201,161,74,0.06), transparent 55%)`,
      }}
    />
  );
}
