import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, User, Send, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import InnerHero from '../components/InnerHero';
import Reveal from '../components/Reveal';
import PremiumButton from '../components/PremiumButton';
import { company, images } from '../data/siteContent';

const mapSearchUrl =
  'https://www.google.com/maps/search/?api=1&query=Vaaman+Texprint+Chinnaravirala+Hayathnagar+Telangana+501505';

const fieldClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink shadow-sm transition placeholder:text-slate/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4200);
  };

  return (
    <PageTransition>
      <InnerHero
        image={images.heroContact}
        eyebrow="Contact"
        title="Direct access to our commercial desk"
        subtitle="Share fabric class, volumes, and target markets — we will respond with a structured next step."
      />

      <section className="py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <Reveal>
              <div className="rounded-3xl border border-line bg-gradient-to-br from-white to-surface p-8 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/12 text-gold">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-ink">Factory</h3>
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate">
                      {company.contact.lines.join('\n')}
                    </p>
                    <a
                      href={mapSearchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-gold hover:opacity-80"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
                  <Phone className="h-5 w-5 text-gold" />
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate">Phone</p>
                  <a href={`tel:+91${company.contact.phone}`} className="mt-2 block font-serif text-xl text-ink hover:text-gold">
                    +91 {company.contact.phone}
                  </a>
                </div>
                <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
                  <Mail className="h-5 w-5 text-gold" />
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate">Email</p>
                  <a href={`mailto:${company.contact.email}`} className="mt-2 block text-sm font-medium text-ink hover:text-gold">
                    {company.contact.email}
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-line bg-navy p-8 text-snow shadow-lift">
                <User className="h-5 w-5 text-gold" />
                <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate">Commercial desk</p>
                <p className="mt-2 font-serif text-xl">{company.contact.contactPerson}</p>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.06}>
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
              <div className="border-b border-line bg-surface/80 px-8 py-6 backdrop-blur-sm">
                <h2 className="font-serif text-2xl text-ink">Send a secure message</h2>
                <p className="mt-2 text-sm text-slate">We typically respond within two business days.</p>
              </div>
              <div className="p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-14 text-center"
                  >
                    <CheckCircle className="h-14 w-14 text-gold" />
                    <h3 className="mt-6 font-serif text-2xl text-ink">Message received</h3>
                    <p className="mt-3 max-w-sm text-sm text-slate">
                      Thank you — our team will review your note and respond shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                          Name
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={fieldClass}
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={fieldClass}
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={fieldClass}
                        placeholder="+91"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                        Project details
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${fieldClass} resize-none`}
                        placeholder="Fabric, quantity bands, destination markets, timelines…"
                      />
                    </div>
                    <PremiumButton type="submit" variant="gold" className="w-full sm:w-auto">
                      <Send className="h-4 w-4" />
                      Submit inquiry
                    </PremiumButton>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-charcoal py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-lineDark shadow-lift">
          <div className="relative aspect-[21/9] min-h-[220px] w-full bg-navy">
            <iframe
              title="Factory location"
              src="https://www.google.com/maps?q=Chinnaravirala+Hayathnagar+501505&output=embed"
              className="absolute inset-0 h-full w-full border-0 opacity-90 grayscale contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30" />
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-snow backdrop-blur-md pointer-events-auto transition hover:bg-white/20"
            >
              Expand map
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
