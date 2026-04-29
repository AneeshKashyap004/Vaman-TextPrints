import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { company } from '../data/siteContent';
import { ArrowRight, Award, Users, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';

function AboutPage() {
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
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Two Decades of Textile Excellence
            </h1>
            <p className="text-lg text-slate leading-relaxed max-w-2xl">
              {company.about}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {company.counters.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-card border border-line"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-ink font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="text-gold" size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-ink mb-3">Quality First</h3>
              <p className="text-slate">
                Uncompromising standards in every process, from raw material to finished fabric.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-gold" size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-ink mb-3">Expert Team</h3>
              <p className="text-slate">
                Skilled professionals with decades of combined experience in textile manufacturing.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Factory className="text-gold" size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-ink mb-3">Modern Infrastructure</h3>
              <p className="text-slate">
                State-of-the-art facilities designed for efficiency, quality, and scale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ink text-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-slate mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our textile expertise can support your manufacturing needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold text-ink font-semibold px-8 py-4 rounded-lg hover:bg-gold/90 transition-colors"
          >
            Get in Touch
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

export default AboutPage;
