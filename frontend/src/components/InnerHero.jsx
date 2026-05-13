import { motion, useReducedMotion } from 'framer-motion';

export default function InnerHero({
  image,
  eyebrow,
  title,
  subtitle,
  align = 'left',
}) {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-[52vh] overflow-hidden bg-charcoal pt-[4.5rem]">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover opacity-55" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/92 to-charcoal/75" />
        <div className="absolute inset-0 bg-mesh-dark opacity-70" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-20 lg:pt-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
        >
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-snow md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate md:text-lg">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
