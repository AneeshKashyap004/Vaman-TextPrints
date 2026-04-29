import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Factory, Award, Users } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { company } from '../data/siteContent';

function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative bg-ink text-surface min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,161,74,0.15),_transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-gold text-sm tracking-[0.3em] uppercase mb-6 block">
              Precision in Textile Processing & Manufacturing
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-surface mb-6 leading-tight">
              Engineering Excellence in Textile Processing
            </h1>
            <p className="text-lg md:text-xl text-slate mb-10 max-w-2xl leading-relaxed">
              {company.heroSubtext}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-gold text-ink font-semibold px-8 py-4 rounded-lg hover:bg-gold/90 transition-all hover:gap-3"
              >
                Explore Services
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-gold text-gold font-semibold px-8 py-4 rounded-lg hover:bg-gold hover:text-ink transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gold text-sm tracking-[0.2em] uppercase mb-4 block">About Us</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-6">
                Two Decades of Excellence
              </h2>
              <p className="text-slate leading-relaxed mb-6">
                {company.about}
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {company.counters.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-serif font-bold text-gold">{stat.value}</div>
                    <div className="text-sm text-slate">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all"
              >
                Learn More About Us <ChevronRight size={18} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-ink/5 to-ink/10 rounded-2xl aspect-[4/3] flex items-center justify-center"
            >
              <div className="text-center p-12">
                <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Factory className="text-gold" size={40} />
                </div>
                <p className="text-slate">About Image Placeholder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm tracking-[0.2em] uppercase mb-4 block">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-4">Our Services</h2>
            <p className="text-slate max-w-2xl mx-auto">
              Comprehensive textile solutions from processing to manufacturing
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.services.slice(0, 4).map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-card border border-line hover:shadow-soft transition-shadow"
              >
                <h3 className="text-lg font-serif font-bold text-ink mb-2">{service.title}</h3>
                <p className="text-slate text-sm mb-4 line-clamp-2">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-ink text-surface font-semibold px-8 py-3 rounded-lg hover:bg-ink/90 transition-colors"
            >
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Infrastructure Highlight */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-ink/5 to-ink/10 rounded-2xl aspect-[4/3] flex items-center justify-center order-2 md:order-1"
            >
              <div className="text-center p-12">
                <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="text-gold" size={40} />
                </div>
                <p className="text-slate">Infrastructure Image Placeholder</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <span className="text-gold text-sm tracking-[0.2em] uppercase mb-4 block">Infrastructure</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-6">
                Built for Scale & Precision
              </h2>
              <p className="text-slate leading-relaxed mb-6">
                Our facilities are designed to handle industrial-scale textile processing
                with consistent quality and efficient throughput.
              </p>
              <ul className="space-y-3 mb-8">
                {['Large-scale processing capacity', 'Advanced dyeing equipment', 'Quality control labs'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ink">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/infrastructure"
                className="inline-flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all"
              >
                Explore Infrastructure <ChevronRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ink text-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="text-gold mx-auto mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Work Together?</h2>
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
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Home;
