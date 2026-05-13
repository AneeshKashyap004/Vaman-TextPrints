import Reveal from './Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  dark = false,
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <Reveal className={`max-w-3xl mb-14 md:mb-16 ${alignCls}`}>
      {eyebrow && (
        <p
          className={`text-xs md:text-sm uppercase tracking-[0.28em] mb-4 ${
            dark ? 'text-gold/90' : 'text-gold'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-tight tracking-tight text-balance ${
          dark ? 'text-snow' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base md:text-lg leading-relaxed max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${dark ? 'text-slate' : 'text-slate'}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
