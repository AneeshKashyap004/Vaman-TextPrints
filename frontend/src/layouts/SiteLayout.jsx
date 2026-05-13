import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MouseGlow from '../components/MouseGlow';
import DocumentTitle from '../components/DocumentTitle';

function SiteLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-surface text-ink">
      <DocumentTitle />
      <MouseGlow />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}

export default SiteLayout;
