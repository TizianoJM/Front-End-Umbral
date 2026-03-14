import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/proyectos/:id" element={<ProjectDetail />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/servicios" element={<Home />} /> {/* For now redirect to home sections */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
