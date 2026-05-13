import {
  Droplets,
  Cog,
  Shirt,
  Layers,
  Wind,
  Leaf,
  StretchHorizontal,
  Printer,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import InnerHero from '../components/InnerHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import ImageFrame from '../components/ImageFrame';
import PremiumButton from '../components/PremiumButton';
import { images, servicesDetailed } from '../data/siteContent';

const iconById = {
  dyeing: Droplets,
  'textile-processing': Cog,
  cotton: Shirt,
  'polyester-cotton': Layers,
  viscose: Wind,
  lyocell: Leaf,
  'cotton-lycra': StretchHorizontal,
  printing: Printer,
  finishing: Sparkles,
};

const visuals = [images.heroServices, images.textileDetail, images.factoryFloor];

export default function ServicesPage() {
  return (
    <PageTransition>
      <InnerHero
        image={images.heroServices}
        eyebrow="Services"
        title="Processing disciplines — each tuned to fibre behaviour"
        subtitle="Dyeing, preparation, printing, and finishing orchestrated as one coherent manufacturing system."
      />

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Programmes"
            title="Nine specialist tracks — one quality bar"
            align="center"
            subtitle="Select a track to understand how we engineer outcomes for your fabric class and end-market."
          />
          <div className="mt-6 space-y-24 md:space-y-28">
            {servicesDetailed.map((svc, index) => {
              const Icon = iconById[svc.id] || Sparkles;
              const img = visuals[index % visuals.length];
              const reverse = index % 2 === 1;
              return (
                <Reveal key={svc.id}>
                  <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative ${reverse ? 'lg:order-2' : ''}`}
                    >
                      <ImageFrame src={img} alt={svc.title} aspect="aspect-[5/4]" />
                      <div className="pointer-events-none absolute -bottom-6 -right-4 hidden rounded-2xl border border-line bg-white/90 px-5 py-4 text-ink shadow-lift backdrop-blur-md md:block">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Service</p>
                        <p className="mt-1 font-serif text-lg">{svc.title}</p>
                      </div>
                    </motion.div>
                    <div className={reverse ? 'lg:order-1' : ''}>
                      <div className="inline-flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2 shadow-card">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/12 text-gold">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate">
                          {String(index + 1).padStart(2, '0')} — Track
                        </span>
                      </div>
                      <h3 className="mt-8 font-serif text-3xl text-ink md:text-4xl">{svc.title}</h3>
                      <p className="mt-4 text-lg text-slate/95">{svc.summary}</p>
                      <p className="mt-5 text-sm leading-relaxed text-slate">{svc.body}</p>
                      <ul className="mt-8 space-y-3">
                        {svc.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-sm text-ink/85">
                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <PremiumButton to="/contact" variant="outline" className="mt-10">
                        Discuss this track
                        <ArrowUpRight className="h-4 w-4" />
                      </PremiumButton>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-charcoal py-section-lg text-snow px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-gold/90">Next step</p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl">Share specifications. We respond with clarity.</h3>
            <p className="mt-5 text-slate">
              Trials, lab dips, approvals, and scale-up — structured with transparent timelines.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <PremiumButton to="/contact" variant="gold">
                Request consultation
              </PremiumButton>
              <PremiumButton to="/infrastructure" variant="ghost" className="text-snow border-white/15 hover:bg-white/5">
                View plant capability
              </PremiumButton>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
