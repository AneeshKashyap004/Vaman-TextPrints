import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SiteLayout from './layouts/SiteLayout';

const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const InfrastructurePage = lazy(() => import('./pages/InfrastructurePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

/** BrowserRouter is not a "data router" — ScrollRestoration is unsupported; scroll on navigation instead. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-charcoal">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <p className="text-xs font-medium uppercase tracking-[0.45em] text-gold/90">Vaaman Texprint</p>
      </motion.div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <SiteLayout>
                <Home />
              </SiteLayout>
            }
          />
          <Route
            path="/about"
            element={
              <SiteLayout>
                <AboutPage />
              </SiteLayout>
            }
          />
          <Route
            path="/services"
            element={
              <SiteLayout>
                <ServicesPage />
              </SiteLayout>
            }
          />
          <Route
            path="/infrastructure"
            element={
              <SiteLayout>
                <InfrastructurePage />
              </SiteLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <SiteLayout>
                <ContactPage />
              </SiteLayout>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

function routerBasename() {
  const base = import.meta.env.BASE_URL;
  if (!base || base === '/') return undefined;
  return base.replace(/\/$/, '') || undefined;
}

function App() {
  return (
    <Router basename={routerBasename()}>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
