import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MouseGlow from '../components/MouseGlow';

function SiteLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-surface text-ink">
      <MouseGlow />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}

export default SiteLayout;
