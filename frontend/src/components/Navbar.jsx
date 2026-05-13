import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Infrastructure', path: '/infrastructure' },
  { name: 'Contact', path: '/contact' },
];

function LogoIcon({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path d="M4 32c6-4 12-2 16 2s10 6 16 2" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M4 24c6-4 12-2 16 2s10 6 16 2" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M4 16c6-4 12-2 16 2s10 6 16 2" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M4 8c6-4 12-2 16 2s10 6 16 2" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  );
}

function NavItem({ to, children, overlay }) {
  return (
    <NavLink to={to} className="group relative px-1 py-2">
      {({ isActive }) => (
        <>
          <span
            className={`text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${
              overlay
                ? isActive
                  ? 'text-gold'
                  : 'text-snow/75 group-hover:text-snow'
                : isActive
                  ? 'text-gold'
                  : 'text-slate group-hover:text-ink'
            }`}
          >
            {children}
          </span>
          <span
            className={`pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 transform bg-gold transition-transform duration-300 ease-luxury group-hover:scale-x-100 ${
              isActive ? 'scale-x-100' : ''
            }`}
          />
        </>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  const isHome = pathname === '/';
  const overlayMode = isHome && !isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    requestAnimationFrame(() => setOpen(false));
  }, [pathname]);

  const shell = overlayMode
    ? 'border-transparent bg-transparent text-snow shadow-none'
    : 'border-line/80 bg-surface/90 text-ink shadow-soft backdrop-blur-xl';

  return (
    <motion.header
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-luxury ${shell}`}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3 outline-none">
          <motion.div
            whileHover={reduce ? {} : { rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.6 }}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors duration-300 ${
              overlayMode
                ? 'border-white/15 bg-white/5 text-gold'
                : 'border-line bg-surface text-gold shadow-card'
            }`}
          >
            <LogoIcon className="h-7 w-7" />
          </motion.div>
          <div className="flex flex-col leading-none">
            <span
              className={`font-serif text-lg font-semibold tracking-tight transition-colors md:text-xl ${
                overlayMode ? 'text-snow' : 'text-ink'
              }`}
            >
              Vaaman Texprint
            </span>
            <span
              className={`mt-1 text-[9px] font-medium uppercase tracking-[0.22em] transition-colors md:text-[10px] ${
                overlayMode ? 'text-snow/55' : 'text-slate'
              }`}
            >
              Private Limited
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavItem key={item.path} to={item.path} overlay={overlayMode}>
              {item.name}
            </NavItem>
          ))}
        </div>

        <button
          type="button"
          className={`rounded-xl p-2.5 md:hidden ${overlayMode ? 'text-snow' : 'text-ink'}`}
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-line/80 bg-surface/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-[0.14em] transition-colors ${
                      isActive ? 'bg-navy text-gold' : 'text-ink/80 hover:bg-navy/5'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
