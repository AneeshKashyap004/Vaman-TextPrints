import { Link } from 'react-router-dom';
import { brand, company } from '../data/siteContent';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Infrastructure', path: '/infrastructure' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-lineDark bg-charcoal text-snow">
      <div className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-90" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.35em] text-gold/90">Vaaman Texprint</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              {brand.legalName}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate">{company.heroSubtext}</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold transition hover:gap-3"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-snow/90">Explore</h3>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate transition hover:text-gold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-snow/90">Contact</h3>
              <ul className="mt-5 space-y-4 text-sm text-slate">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                  <span className="leading-relaxed">{company.contact.addressDisplay}</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                  <a href={`mailto:${company.contact.email}`} className="hover:text-gold">
                    {company.contact.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:+91${company.contact.phone}`} className="hover:text-gold">
                    +91 {company.contact.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="glass-dark flex flex-col justify-between rounded-2xl p-6 lg:col-span-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-gold/90">Direct line</p>
              <p className="mt-3 text-sm text-slate">{company.contact.contactPerson}</p>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-slate/80">
              Export-oriented processing with disciplined quality systems and on-time dispatch.
            </p>
          </div>
        </div>

        <div className="divider-gold mt-14 opacity-60" />
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em]">Hayathnagar · Telangana · India</p>
        </div>
      </div>
    </footer>
  );
}
