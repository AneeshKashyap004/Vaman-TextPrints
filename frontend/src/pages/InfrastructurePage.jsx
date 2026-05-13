import { motion } from 'framer-motion';
import { Cpu, ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import InnerHero from '../components/InnerHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import ImageFrame from '../components/ImageFrame';
import PremiumButton from '../components/PremiumButton';
import { images, machinery, infrastructureHighlights } from '../data/siteContent';

const gallery = [images.heroInfrastructure, images.factoryFloor, images.textileDetail];

export default function InfrastructurePage() {
  return (
    <PageTransition>
      <InnerHero
        image={images.heroInfrastructure}
        eyebrow="Infrastructure"
        title="Industrial muscle. Refined control."
        subtitle="European and Indian ranges orchestrated for preparation, colour, dimensional stability, and finishing — at export cadence."
      />

      <section className="border-b border-line bg-white py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Capability"
                title="Machinery roster engineered for full-spectrum textile processing"
                subtitle="Singeeing through printing and finishing — integrated for predictable outcomes and disciplined changeovers."
              />
            </div>
            <div className="rounded-3xl border border-line bg-surface p-8 shadow-card lg:col-span-5">
              <Cpu className="h-8 w-8 text-gold" />
              <p className="mt-4 text-sm leading-relaxed text-slate">
                Each line is operated within documented parameters — so approvals translate into repeatable bulk performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {machinery.map((m, i) => {
              const visual = gallery[i % gallery.length];
              return (
                <Reveal key={m.name} delay={(i % 6) * 0.04}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow duration-500 hover:border-gold/30 hover:shadow-lift"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <img
                        src={visual}
                        alt=""
                        className="h-full w-full object-cover transition duration-[900ms] ease-luxury group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-90" />
                      <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-sm font-serif text-gold backdrop-blur-md">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-8">
                      <h3 className="font-serif text-xl text-ink md:text-2xl">{m.name}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{m.note}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold opacity-80 transition group-hover:opacity-100">
                        Line detail
                        <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/0 transition group-hover:ring-gold/15" />
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-navy py-section text-snow px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold/90">Gallery</p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl">Production environments — controlled, luminous, precise</h3>
            <p className="mt-5 text-slate">
              Imagery shown uses premium industrial placeholders. Replace with on-site photography when ready — filenames are centralized in{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">src/data/siteContent.js</code>.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate">
              {infrastructureHighlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((src, idx) => (
              <Reveal key={src} delay={idx * 0.06}>
                <ImageFrame src={src} alt="" aspect="aspect-square" rounded="rounded-2xl" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl border border-line bg-gradient-to-br from-white to-surface px-8 py-14 text-center shadow-soft">
          <h3 className="font-serif text-3xl text-ink">Book a technical walkthrough</h3>
          <p className="mt-4 text-slate">See ranges, discuss SOPs, and validate quality checkpoints with our team.</p>
          <PremiumButton to="/contact" variant="gold" className="mt-8">
            Contact operations
          </PremiumButton>
        </Reveal>
      </section>
    </PageTransition>
  );
}
