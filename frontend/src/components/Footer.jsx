import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react';

const contactInfo = {
  address:
    'Factory # 3-96, Sy. No. 171/A, Chinnaravirala (V), Hayathnagar (M), Rangareddy, Telangana - 501505',
  email: 'vaamantexprint@gmail.com',
};

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Infrastructure', path: '/infrastructure' },
  { name: 'Contact', path: '/contact' },
];

function Footer() {
  return (
    <footer className="bg-ink text-surface border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-surface mb-1">
              Vaaman Texprint
            </h2>
            <p className="text-gold text-sm tracking-wider mb-4">Private Limited</p>
            <p className="text-slate mb-6 leading-relaxed max-w-md">
              Precision in Textile Processing & Manufacturing. Over 22 years of
              expertise in delivering quality textile solutions.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-surface/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="text-gold" size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-surface/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="text-gold" size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-surface/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="text-gold" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-surface mb-6 font-serif">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-surface mb-6 font-serif">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold flex-shrink-0 mt-1" size={18} />
                <span className="text-slate text-sm leading-relaxed">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold flex-shrink-0" size={18} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-slate hover:text-gold transition-colors text-sm"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-line mt-12 pt-8 text-center">
          <p className="text-slate/70 text-sm">
            © {new Date().getFullYear()} Vaaman Texprint Private Limited. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
