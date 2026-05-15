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
import { useSiteContent } from '../hooks/useSiteContent';
import { pickPrimaryImage, pickThumb, resolveMediaUrl } from '../lib/media';

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

export default function ProductsPage() {
  const { content } = useSiteContent();
  const { images, servicesDetailed: products, pages } = content;
  const pageMeta = pages?.products || {};
  const visuals = [
    images.heroProducts || images.heroServices,
    images.textileDetail,
    images.factoryFloor,
  ];

  return (
    <PageTransition>
      <InnerHero
        image={images.heroProducts || images.heroServices}
        eyebrow={pageMeta.eyebrow || 'Products'}
        title={pageMeta.title || 'Processing disciplines each tuned to fibre behaviour'}
        subtitle={pageMeta.subtitle || 'Preprocess, dyeing, printing and finishing'}
      />

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            eyebrow={pageMeta.sectionEyebrow || 'Programmes'}
            title={pageMeta.sectionTitle || 'Specialist programmes — one quality bar'}
            align="center"
            subtitle={
              pageMeta.sectionSubtitle ||
              'Select a programme to understand how we engineer outcomes for your fabric class.'
            }
          />
          <motion.div
            className="mt-6 space-y-24 md:space-y-28"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          >
            {products.map((svc, index) => {
              const Icon = iconById[svc.id] || Sparkles;
              const fallback = visuals[index % visuals.length];
              const img = pickPrimaryImage(svc, fallback);
              const reverse = index % 2 === 1;
              const displayNum = svc.number != null ? svc.number : index + 1;
              return (
                <motion.div
                  key={svc.id}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative ${reverse ? 'lg:order-2' : ''}`}
                    >
                      <ImageFrame
                        src={pickThumb(svc) || img}
                        srcSet={
                          svc.images?.length
                            ? `${resolveMediaUrl(svc.image || svc.images[0]?.url)} 1200w, ${pickThumb(svc)} 480w`
                            : undefined
                        }
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        alt={svc.title}
                        aspect="aspect-[5/4]"
                      />
                      <motion.div
                        className="pointer-events-none absolute -bottom-6 -right-4 hidden rounded-2xl border border-line bg-white/90 px-5 py-4 text-ink shadow-lift backdrop-blur-md md:block"
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Product</p>
                        <p className="mt-1 font-serif text-lg">{svc.title}</p>
                      </motion.div>
                    </motion.div>
                    <motion.div className={reverse ? 'lg:order-1' : ''}>
                      <div className="inline-flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2 shadow-card transition-shadow hover:shadow-soft">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/12 text-gold">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </span>
                        {svc.category && (
                          <span className="text-[10px] uppercase tracking-[0.2em] text-slate">
                            {svc.category}
                          </span>
                        )}
                        <span className="font-serif text-sm tracking-wide text-ink/80">
                          {String(displayNum).padStart(2, '0')} —
                        </span>
                      </div>
                      <h3 className="mt-8 font-serif text-3xl text-ink md:text-4xl">{svc.title}</h3>
                      <p className="mt-4 text-lg text-slate/95">{svc.summary}</p>
                      {(svc.description || svc.body) && (
                        <p className="mt-5 text-sm leading-relaxed text-slate">
                          {svc.description || svc.body}
                        </p>
                      )}
                      <ul className="mt-8 space-y-3">
                        {(svc.features || []).map((f) => (
                          <li key={f} className="flex items-start gap-3 text-sm text-ink/85">
                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <PremiumButton to="/contact" variant="outline" className="mt-10">
                        Contact us to discuss your needs
                        <ArrowUpRight className="h-4 w-4" />
                      </PremiumButton>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <section className="border-t border-line bg-charcoal py-section-lg text-snow px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-gold/90">Next step</p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl">
              Share specifications. We respond with clarity.
            </h3>
            <p className="mt-5 text-slate">
              Trials, lab dips, approvals, and scale-up — structured with transparent timelines.
            </p>
            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-4"
              whileHover="hover"
              initial="rest"
              variants={{ rest: {}, hover: {} }}
            >
              <PremiumButton to="/contact" variant="gold">
                Request consultation
              </PremiumButton>
              <PremiumButton
                to="/infrastructure"
                variant="ghost"
                className="border-white/15 text-snow hover:bg-white/5"
              >
                View plant capability
              </PremiumButton>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
