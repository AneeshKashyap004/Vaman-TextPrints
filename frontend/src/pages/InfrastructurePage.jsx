import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { company } from '../data/siteContent';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

function InfrastructurePage() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative bg-ink text-surface py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-gold text-sm tracking-[0.2em] uppercase mb-4 block">
              Infrastructure
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Built for Scale & Precision
            </h1>
            <p className="text-lg text-slate leading-relaxed max-w-2xl">
              Our facilities are designed to handle industrial-scale textile processing
              with consistent quality and efficient throughput.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Cards */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {company.infrastructure.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card border border-line"
              >
                {/* Placeholder Image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-ink/5 to-ink/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-gold font-serif text-2xl font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-slate text-sm">Image Placeholder</p>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-serif font-bold text-ink mb-3">{item.title}</h3>
                  <p className="text-slate">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold text-sm tracking-[0.2em] uppercase mb-4 block">
                Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-6">
                Industrial-Grade Facilities
              </h2>
              <p className="text-slate mb-8 leading-relaxed">
                Our infrastructure supports high-volume production while maintaining
                the quality standards expected in the textile industry.
              </p>
              <ul className="space-y-4">
                {[
                  'Large-scale processing capacity',
                  'Advanced dyeing and finishing equipment',
                  'Quality control laboratories',
                  'Efficient material handling systems',
                  'Environmentally conscious operations',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="text-gold flex-shrink-0 mt-1" size={20} />
                    <span className="text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-ink/5 to-ink/10 rounded-2xl aspect-[4/3] flex items-center justify-center"
            >
              <div className="text-center p-12">
                <div className="w-24 h-24 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold font-serif text-4xl font-bold">VT</span>
                </div>
                <p className="text-slate">Facility Overview Placeholder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ink text-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Visit Our Facility
          </h2>
          <p className="text-slate mb-8 max-w-2xl mx-auto">
            See our infrastructure firsthand. Schedule a visit to discuss your requirements.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold text-ink font-semibold px-8 py-4 rounded-lg hover:bg-gold/90 transition-colors"
          >
            Schedule a Visit
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

export default InfrastructurePage;
