import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SiteContentProvider } from './context/SiteContentContext';
import SiteLayout from './layouts/SiteLayout';

const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const InfrastructurePage = lazy(() => import('./pages/InfrastructurePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

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
        className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent"
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

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
            path="/products"
            element={
              <SiteLayout>
                <ProductsPage />
              </SiteLayout>
            }
          />
          <Route path="/services" element={<Navigate to="/products" replace />} />
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
    <SiteContentProvider>
      <Router basename={routerBasename()}>
        <AppRoutes />
      </Router>
    </SiteContentProvider>
  );
}

export default App;
