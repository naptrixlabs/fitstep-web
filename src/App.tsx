import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { NutritionPage } from './pages/NutritionPage';
import { DocPage } from './pages/DocPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="site">
      <ScrollToTop />
      <div className="bg-aurora" aria-hidden="true" />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/privacy" element={<DocPage slug="privacy" fallbackTitle="Privacy Policy" />} />
          <Route path="/terms" element={<DocPage slug="terms" fallbackTitle="Terms of Service" />} />
          <Route path="/help" element={<DocPage slug="help" fallbackTitle="Help & Support" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
