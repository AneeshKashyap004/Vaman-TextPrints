import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const COMPANY = 'Vaaman Texprint Private Limited';
/** Optional: set `VITE_HOME_TITLE` in `.env` to e.g. `Vaaman Texprint | Premium Textile Processing` */
const HOME_TITLE = import.meta.env.VITE_HOME_TITLE?.trim() || COMPANY;

const SECTION = {
  '/about': 'About',
  '/services': 'Services',
  '/infrastructure': 'Infrastructure',
  '/contact': 'Contact',
};

/**
 * Browser tab titles: company name on home; short section prefix elsewhere for readability in narrow tabs.
 */
export default function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      document.title = HOME_TITLE;
      return;
    }
    const section = SECTION[pathname];
    document.title = section ? `${section} · Vaaman Texprint` : COMPANY;
  }, [pathname]);

  return null;
}
