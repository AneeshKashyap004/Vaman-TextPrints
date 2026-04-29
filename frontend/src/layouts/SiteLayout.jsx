import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}

export default SiteLayout;
