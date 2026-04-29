import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { company } from '../data/siteContent';
import { Droplets, Shirt, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const serviceIcons = {
  'Dyeing & Processing': Droplets,
  'Textile Manufacturing': Shirt,
  'Polycot Fabric Processing': Layers,
  'Industrial Finishing': Sparkles,
};

function ServicesPage() {
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
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Comprehensive Textile Solutions
            </h1>
            <p className="text-lg text-slate leading-relaxed max-w-2xl">
              From dyeing and processing to manufacturing and finishing, we provide
              end-to-end textile services with precision and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {company.services.map((service, index) => {
              const Icon = serviceIcons[service.title] || Sparkles;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-8 shadow-card border border-line hover:shadow-soft transition-shadow"
                >
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                    <Icon className="text-gold" size={28} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-ink mb-4">
                    {service.title}
                  </h3>
                  <p className="text-slate leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight size={18} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-sm tracking-[0.2em] uppercase mb-4 block">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink">
              How We Work
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Understanding your requirements' },
              { step: '02', title: 'Planning', desc: 'Detailed production roadmap' },
              { step: '03', title: 'Execution', desc: 'Precision manufacturing' },
              { step: '04', title: 'Delivery', desc: 'Quality-checked dispatch' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-serif font-bold text-gold/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-serif font-bold text-ink mb-2">{item.title}</h3>
                <p className="text-slate">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ink text-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-slate mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can bring your textile vision to life with our expertise.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold text-ink font-semibold px-8 py-4 rounded-lg hover:bg-gold/90 transition-colors"
          >
            Start a Conversation
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

export default ServicesPage;
