import { Link } from 'react-router-dom';

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden font-semibold tracking-wide transition-transform duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:scale-[0.98]';

const variants = {
  gold: `${base} rounded-full bg-gold text-navy px-8 py-3.5 text-sm uppercase shadow-gold hover:shadow-lift`,
  outline: `${base} rounded-full border border-gold/80 text-gold px-8 py-3.5 text-sm uppercase hover:bg-gold/10`,
  ghost: `${base} rounded-full text-gold px-6 py-2.5 text-sm uppercase border border-transparent hover:border-gold/35`,
};

export default function PremiumButton({
  variant = 'gold',
  to,
  href,
  children,
  className = '',
  type = 'button',
  ...rest
}) {
  const cls = `${variants[variant] ?? variants.gold} ${className}`;
  const shine = (
    <span
      className="pointer-events-none absolute inset-0 z-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition duration-700 ease-luxury group-hover:translate-x-[120%] group-hover:opacity-100"
      aria-hidden
    />
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {shine}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {shine}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    );
  }
  return (
    <button type={type} className={cls} {...rest}>
      {shine}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
