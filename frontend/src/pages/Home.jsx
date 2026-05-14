import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ChevronDown, ArrowUpRight, Factory } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Reveal from '../components/Reveal';
import AnimatedCounter from '../components/AnimatedCounter';
import PremiumButton from '../components/PremiumButton';
import ImageFrame from '../components/ImageFrame';
import SectionHeading from '../components/SectionHeading';
import {
  company,
  images,
  homeServicePreviews,
  whyChooseUs,
  machinery,
} from '../data/siteContent';

const wordContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.12 },
  },
};

const wordItem = {
  hidden: { opacity: 0, y: '0.35em' },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 40]);
  const words = company.heroHeading.split(' ');

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-charcoal">
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <img
          src={images.heroHome}
          alt=""
          className="h-[115%] w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-navy/82" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-navy/40" />
        <div className="absolute inset-0 bg-mesh-dark opacity-60" />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36"
      >
        <p className="text-xs font-medium uppercase tracking-[0.38em] text-gold/95">
          {company.heroEyebrow}
        </p>
        <motion.h1
          variants={wordContainer}
          initial="hidden"
          animate="show"
          className="mt-5 max-w-4xl font-serif text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-snow sm:text-5xl md:text-6xl lg:text-[3.35rem]"
        >
          {words.map((w, i) => (
            <motion.span key={`${w}-${i}`} variants={wordItem} className="inline-block pr-[0.2em]">
              {w}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-slate md:text-lg"
        >
          {company.heroSubtext}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.55 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <PremiumButton to="/services" variant="gold">
            Explore capabilities
            <ArrowUpRight className="h-4 w-4" />
          </PremiumButton>
          <PremiumButton to="/contact" variant="outline">
            Contact us
          </PremiumButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 md:block"
        animate={reduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2 text-snow/50">
          <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
          <ChevronDown className="h-5 w-5" strokeWidth={1.25} />
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const featuredMachines = machinery.slice(0, 3);

  return (
    <PageTransition>
      <Hero />

      <section className="border-y border-line bg-charcoal py-16 text-snow md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
          {company.counters.map((c) => (
            <Reveal key={c.label} className="relative overflow-hidden rounded-2xl border border-lineDark bg-navy/40 p-8 shadow-innerGlow">
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gold/10 blur-2xl" />
              <div className="font-serif text-4xl font-semibold text-gold md:text-5xl">
                <AnimatedCounter
                  numeric={c.numeric}
                  suffix={c.suffix}
                  duration={c.duration}
                />
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-slate">{c.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Profile"
            title="A textile processing partner built for demanding programs"
            subtitle={company.about}
          />
          <Reveal>
            <ImageFrame src={images.textileDetail} alt="Textile manufacturing detail" />
            
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-white py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Capabilities"
            title="Processing breadth across natural, blend, and regenerated fibres"
            subtitle="Each programme is engineered for shade integrity, mechanical stability, and the performance your customers expect."
            align="center"
          />
          <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {homeServicePreviews.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 shadow-card transition-shadow duration-500 hover:border-gold/25 hover:shadow-lift"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-serif text-xl text-ink">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{s.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink/50 transition group-hover:text-gold">
                    Details
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <PremiumButton to="/services" variant="outline">
              View services
            </PremiumButton>
          </div>
        </div>
      </section>

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why Vaaman"
            title="Industrial rigor with the restraint of a luxury house"
            subtitle="We invest in machinery, methods, and people — then let the work speak with quiet confidence."
          />
          <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <div className="h-full rounded-2xl border border-line bg-gradient-to-br from-white to-surface p-8 shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-soft">
                  <div className="h-px w-10 bg-gold/80" />
                  <h3 className="mt-6 font-serif text-xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-navy py-section text-snow px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Infrastructure"
              title="Machinery that defines throughput, precision, and finish"
              subtitle="From singeing through stenters and rotary printing — integrated lines engineered for export-grade programs."
              dark
            />
            <div className="space-y-5">
              {featuredMachines.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.08}>
                  <div className="flex items-start justify-between gap-6 rounded-2xl border border-lineDark bg-white/5 px-6 py-5 backdrop-blur-md transition hover:border-gold/25 hover:bg-white/[0.07]">
                    <div>
                      <p className="font-serif text-lg text-snow">{m.name}</p>
                      <p className="mt-2 text-sm text-slate">{m.note}</p>
                    </div>
                    <span className="font-serif text-2xl text-gold/40">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </Reveal>
              ))}
              <PremiumButton to="/infrastructure" variant="outline" className="mt-4 border-snow/25 text-snow hover:bg-white/10">
                Full machinery roster
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-charcoal py-section-lg px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-navy/40 blur-3xl" />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold/90">Partnership</p>
          <h2 className="mt-4 font-serif text-3xl text-snow md:text-4xl lg:text-[2.6rem]">
            Partner with a trusted textile manufacturing expert
          </h2>
          <p className="mt-6 text-slate">
            Share your fabric class, program volumes, and quality benchmarks — we will respond with a clear path to production.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PremiumButton to="/contact" variant="gold">
              Get in touch
            </PremiumButton>
            <PremiumButton href={`mailto:${company.contact.email}`} variant="ghost">
              {company.contact.email}
            </PremiumButton>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
