import { motion } from 'framer-motion';
import { Cpu, ArrowUpRight, Shield, Gauge, Users, Award } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import InnerHero from '../components/InnerHero';
import Reveal from '../components/Reveal';
import ImageFrame from '../components/ImageFrame';
import PremiumButton from '../components/PremiumButton';
import AnimatedCounter from '../components/AnimatedCounter';
import { useSiteContent } from '../hooks/useSiteContent';
import { pickPrimaryImage, pickThumb, resolveMediaUrl } from '../lib/media';

const statIcons = [Gauge, Shield, Users, Award];

const teamPillars = [
  'Skilled workers',
  'Experienced staff',
  'Dedicated officers',
  'Management support',
];

const defaultCapabilityIntro =
  'Each line is operated within documented parameters — so approvals translate into repeatable bulk performance.';

function capabilityIntro(body) {
  if (!body?.trim()) return defaultCapabilityIntro;
  const trimmed = body.trim().replace(/\s*:\s*$/, '');
  const withoutList = trimmed.replace(
    /\s+with\s+(skilled workers|experienced staff).+$/i,
    ''
  );
  return withoutList.trim() || defaultCapabilityIntro;
}

export default function InfrastructurePage() {
  const { content } = useSiteContent();
  const {
    images,
    machinery,
    infrastructureHighlights,
    infrastructureCapability,
    company,
    pages,
  } = content;
  const infraMeta = pages?.infrastructure || {};

  const capabilityIntroText = capabilityIntro(infrastructureCapability?.body);

  const gallery = [
    images.heroInfrastructure,
    images.factoryFloor,
    images.textileDetail,
  ];

  return (
    <PageTransition>
      <InnerHero
        image={images.infrastructureCapability || images.heroInfrastructure}
        eyebrow={infraMeta.eyebrow || 'Infrastructure'}
        title={infraMeta.title || infrastructureCapability?.title || 'For best quality and quantity production'}
        subtitle={infraMeta.subtitle || capabilityIntroText}
      />

      <section className="border-b border-line bg-white py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <div className="glass-panel flex flex-col rounded-2xl border border-line p-6 shadow-card lg:p-8">
                <Cpu className="h-6 w-6 text-gold" />
                <h2 className="mt-4 font-serif text-2xl text-ink md:text-[1.65rem]">
                  Operational discipline
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {capabilityIntroText}
                </p>
                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {teamPillars.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              <Reveal className="sm:col-span-2">
                <ImageFrame
                  src={images.infrastructureCapability || images.heroInfrastructure}
                  alt="Manufacturing capability"
                  aspect="aspect-[16/9]"
                  rounded="rounded-2xl"
                />
              </Reveal>
              {(company.counters || []).slice(0, 4).map((stat, i) => {
                const Icon = statIcons[i] || Gauge;
                return (
                  <Reveal key={stat.label} delay={i * 0.06} className="h-full">
                    <motion.div
                      whileHover={{ y: -6, boxShadow: '0 28px 70px rgba(11,31,58,0.14)' }}
                      className="glass-panel flex h-full min-h-[9.5rem] flex-col rounded-2xl p-6 transition-shadow duration-500"
                    >
                      <Icon className="h-6 w-6 text-gold" />
                      <p className="mt-4 font-serif text-3xl text-ink">
                        <AnimatedCounter
                          numeric={stat.numeric}
                          suffix={stat.suffix}
                          duration={stat.duration}
                        />
                      </p>
                      <p className="mt-auto pt-2 text-xs uppercase tracking-[0.18em] text-slate">
                        {stat.label}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 text-center md:mb-16">
            <p className="text-xs uppercase tracking-[0.32em] text-gold">Quality Assurance</p>
            <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
              Global-grade checks built into every run
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Lab validation',
                desc: 'Measured checks for shade integrity, hand-feel, and performance alignment.',
                Icon: Shield,
              },
              {
                title: 'Shade matching',
                desc: 'Repeatable colour discipline with documented references per lot.',
                Icon: Gauge,
              },
              {
                title: 'Defect prevention',
                desc: 'Proactive controls to minimize unevenness, contamination, and risk factors.',
                Icon: Award,
              },
              {
                title: 'Export dispatch',
                desc: 'Packaging and readiness engineered for reliable downstream handling.',
                Icon: Users,
              },
            ].map(({ title, desc, Icon }, idx) => (
              <Reveal key={title} delay={idx * 0.06}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-panel rounded-2xl p-7 border border-line bg-white/60 shadow-card"
                >
                  <Icon className="h-7 w-7 text-gold" />
                  <h3 className="mt-5 font-serif text-xl text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 text-center md:mb-16">
            <p className="text-xs uppercase tracking-[0.32em] text-gold">Machinery</p>
            <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
              Industrial lines — precision at scale
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {machinery.map((m, i) => {
              const fallback = gallery[i % gallery.length];
              const visual = pickPrimaryImage(m, fallback);
              const thumb = pickThumb(m) || visual;
              return (
                <Reveal key={m.name} delay={(i % 6) * 0.04}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow duration-500 hover:border-gold/30 hover:shadow-lift"
                  >
                    <motion.div className="relative aspect-[16/11] overflow-hidden">
                      <img
                        src={thumb}
                        srcSet={
                          m.images?.length
                            ? `${resolveMediaUrl(m.image || m.images[0]?.url)} 1200w, ${thumb} 480w`
                            : undefined
                        }
                        sizes="(max-width: 768px) 100vw, 33vw"
                        alt={m.name}
                        className="h-full w-full object-cover transition duration-[900ms] ease-luxury group-hover:scale-[1.06]"
                        loading="lazy"
                        decoding="async"
                      />
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-90" />
                      <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 font-serif text-sm text-gold backdrop-blur-md">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </motion.div>
                    <div className="flex flex-1 flex-col p-8">
                      <h3 className="font-serif text-xl text-ink md:text-2xl">{m.name}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
                        {m.note || m.description}
                      </p>
                      {(m.highlights || []).length > 0 && (
                        <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-xs text-ink/80">
                          {m.highlights.slice(0, 3).map((h) => (
                            <li key={h} className="flex gap-2">
                              <span className="text-gold">·</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                      <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold opacity-80 transition group-hover:opacity-100">
                        Line detail
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}          </div>
        </div>
      </section>

      <section className="border-t border-line bg-navy py-section text-snow px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold/90">Gallery</p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl">
              Production environments — controlled, luminous, precise
            </h3>
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
              <Reveal key={`${src}-${idx}`} delay={idx * 0.06}>
                <ImageFrame src={src} alt="" aspect="aspect-square" rounded="rounded-2xl" />
              </Reveal>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl border border-line bg-gradient-to-br from-white to-surface px-8 py-14 text-center shadow-soft">
          <h3 className="font-serif text-3xl text-ink">Book a technical walkthrough</h3>
          <p className="mt-4 text-slate">
            See ranges, discuss SOPs, and validate quality checkpoints with our team.
          </p>
          <PremiumButton to="/contact" variant="gold" className="mt-8">
            Contact operations
          </PremiumButton>
        </Reveal>
      </section>
    </PageTransition>
  );
}
