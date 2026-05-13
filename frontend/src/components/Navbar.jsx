import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { WaveLogoMark } from './LogoMark';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Infrastructure', path: '/infrastructure' },
  { name: 'Contact', path: '/contact' },
];

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
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group/logo flex min-w-0 max-w-[min(100%,18rem)] shrink-0 items-center gap-2.5 outline-none sm:max-w-[26rem] sm:gap-3.5"
        >
          <motion.div
            className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[0.65rem] border sm:h-11 sm:w-11 sm:rounded-2xl ${
              overlayMode
                ? 'border-white/18 bg-white/[0.07] text-gold shadow-[0_0_0_1px_rgba(255,255,255,0.06)]'
                : 'border-line bg-surface text-gold shadow-card'
            }`}
            whileHover={
              reduce
                ? {}
                : {
                    scale: 1.05,
                    boxShadow: overlayMode
                      ? '0 12px 36px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,161,74,0.35)'
                      : '0 14px 40px rgba(11,31,58,0.12), 0 0 0 1px rgba(201,161,74,0.22)',
                  }
            }
            whileTap={reduce ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            <motion.div
              className="flex h-full w-full items-center justify-center p-[0.55rem] sm:p-2"
              whileHover={reduce ? {} : { rotate: [0, -3, 3, 0] }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <WaveLogoMark className="h-[1.45rem] w-[1.45rem] sm:h-7 sm:w-7" strokeWidth={2.15} />
            </motion.div>
          </motion.div>
          <div className="min-w-0 flex flex-col justify-center leading-[1.05]">
            <span
              className={`truncate font-serif text-[1.05rem] font-semibold tracking-[-0.02em] transition-colors sm:text-lg md:text-xl ${
                overlayMode ? 'text-snow' : 'text-ink'
              }`}
            >
              Vaaman Texprint
            </span>
            <span
              className={`mt-[0.2rem] truncate text-[9px] font-medium uppercase tracking-[0.2em] transition-colors sm:text-[10px] sm:tracking-[0.22em] ${
                overlayMode ? 'text-snow/55' : 'text-slate'
              }`}
            >
              Private Limited
            </span>
          </div>
        </Link>

        <div className="hidden shrink-0 items-center gap-7 md:flex lg:gap-8">
          {navItems.map((item) => (
            <NavItem key={item.path} to={item.path} overlay={overlayMode}>
              {item.name}
            </NavItem>
          ))}
        </div>

        <button
          type="button"
          className={`shrink-0 rounded-xl p-2.5 md:hidden ${overlayMode ? 'text-snow' : 'text-ink'}`}
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
