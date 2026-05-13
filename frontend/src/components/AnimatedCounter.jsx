import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

export default function AnimatedCounter({ numeric, suffix = '', duration = 1.4, className = '' }) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const display = reduce ? numeric : value;

  useEffect(() => {
    if (reduce) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / (duration * 1000));
            setValue(Math.round(numeric * easeOutCubic(t)));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [numeric, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
