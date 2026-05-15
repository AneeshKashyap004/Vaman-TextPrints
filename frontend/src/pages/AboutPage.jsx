import { Target, Sparkles, Building2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import InnerHero from '../components/InnerHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import ImageFrame from '../components/ImageFrame';
import PremiumButton from '../components/PremiumButton';
import AnimatedCounter from '../components/AnimatedCounter';
import { useSiteContent } from '../hooks/useSiteContent';

export default function AboutPage() {
  const { content } = useSiteContent();
  const { company, images, timeline, infrastructureHighlights, pages } = content;
  const aboutMeta = pages?.about || {};

  return (
    <PageTransition>
      <InnerHero
        image={images.heroAbout}
        eyebrow={aboutMeta.eyebrow || 'About Vaaman Texprint'}
        title={aboutMeta.title || 'Heritage of processing. Built for global benchmarks.'}
        subtitle={aboutMeta.subtitle || company.about}
      />

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
          <Reveal className="rounded-3xl border border-line bg-white p-10 shadow-card lg:col-span-1">
            <Target className="h-9 w-9 text-gold" />
            <h3 className="mt-6 font-serif text-2xl text-ink">Vision</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate">{company.vision}</p>
          </Reveal>
          <Reveal delay={0.06} className="rounded-3xl border border-line bg-navy p-10 text-snow shadow-lift lg:col-span-2">
            <Sparkles className="h-9 w-9 text-gold" />
            <h3 className="mt-6 font-serif text-2xl">Journey</h3>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate">{company.background}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-white py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Timeline"
            title="Measured expansion — never at the cost of control"
            align="center"
            subtitle="From a focused cotton–polyester foundation to a multi-fibre processing platform."
          />
          <div className="relative mx-auto mt-16 max-w-2xl border-l border-gold/25 pl-10 md:pl-14">
            {timeline.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="relative pb-14 last:pb-0">
                  <span className="absolute -left-[21px] top-2 flex h-3 w-3 rounded-full border-2 border-gold bg-surface shadow-[0_0_0_6px_rgba(201,161,74,0.12)] md:-left-[25px]" />
                  <div className="rounded-2xl border border-line bg-surface p-8 shadow-card transition hover:border-gold/20 hover:shadow-soft">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">{item.year}</p>
                    <h4 className="mt-3 font-serif text-xl text-ink">{item.title}</h4>
                    <p className="mt-3 text-sm text-slate">{item.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <ImageFrame src={images.factoryFloor} alt="Manufacturing environment" />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Infrastructure"
              title="Engineered spaces for throughput and repeatability"
              subtitle="Production is organized around flow, safety, and measurable quality — so approvals scale into steady supply."
            />
            <ul className="mt-8 space-y-4">
              {infrastructureHighlights.map((line) => (
                <li key={line} className="flex gap-3 text-sm text-slate">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                  {line}
                </li>
              ))}
            </ul>
            <PremiumButton to="/infrastructure" variant="gold" className="mt-10">
              Explore machinery
            </PremiumButton>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-section text-snow px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          {company.counters.slice(0, 3).map((c) => (
            <Reveal key={c.label}>
              <div className="rounded-2xl border border-lineDark bg-white/[0.04] p-8 text-center backdrop-blur-md">
                <div className="font-serif text-4xl text-gold">
                  <AnimatedCounter numeric={c.numeric} suffix={c.suffix} duration={c.duration} />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate">{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl border border-line bg-gradient-to-br from-white to-surface px-8 py-14 text-center shadow-soft">
          <Building2 className="h-10 w-10 text-gold" />
          <h3 className="mt-6 font-serif text-3xl text-ink">Visit the narrative in person</h3>
          <p className="mt-4 text-slate">Walk the ranges, review quality systems, and align on program expectations.</p>
          <PremiumButton to="/contact" variant="outline" className="mt-8">
            Schedule a conversation
          </PremiumButton>
        </Reveal>
      </section>
    </PageTransition>
  );
}
