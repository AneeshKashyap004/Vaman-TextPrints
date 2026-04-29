import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { company } from '../data/siteContent';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show success without backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Let&apos;s Start a Conversation
            </h1>
            <p className="text-lg text-slate leading-relaxed max-w-2xl">
              Whether you have a question about our services, need a quote, or want to
              discuss a partnership, we&apos;re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-serif font-bold text-ink mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">Address</h3>
                    <p className="text-slate leading-relaxed">{company.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">Email</h3>
                    <a
                      href={`mailto:${company.contact.email}`}
                      className="text-slate hover:text-gold transition-colors"
                    >
                      {company.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 aspect-video bg-gradient-to-br from-ink/5 to-ink/10 rounded-2xl flex items-center justify-center border border-line">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-gold" size={32} />
                  </div>
                  <p className="text-slate">Map Integration Placeholder</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-card border border-line">
                <h2 className="text-2xl font-serif font-bold text-ink mb-6">Send a Message</h2>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="text-gold mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-serif font-bold text-ink mb-2">Message Sent!</h3>
                    <p className="text-slate">We&apos;ll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-ink placeholder-slate focus:outline-none focus:border-gold transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-ink placeholder-slate focus:outline-none focus:border-gold transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-ink placeholder-slate focus:outline-none focus:border-gold transition-colors"
                        placeholder="+91 ..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-ink placeholder-slate focus:outline-none focus:border-gold transition-colors resize-none"
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gold text-ink font-semibold py-4 rounded-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default ContactPage;
