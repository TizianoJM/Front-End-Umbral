import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

const NAV_LINKS = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/#services' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-10 w-auto" />
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black tracking-tighter text-navy uppercase">Umbral</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Ingeniería</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <HashLink
                key={link.name}
                to={link.href}
                smooth
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href.split('#')[0] && !link.href.includes('#') ? "text-primary font-bold" : "text-slate-600"
                )}
              >
                {link.name}
              </HashLink>
            ))}
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/contacto"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Solicitar Presupuesto
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <HashLink
                  key={link.name}
                  to={link.href}
                  smooth
                  className="block text-base font-medium text-slate-900"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </HashLink>
              ))}
              <Link
                to="/login"
                className="block text-base font-medium text-slate-900"
                onClick={() => setIsOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/contacto"
                className="block w-full text-center py-3 rounded-lg bg-primary text-white font-bold"
                onClick={() => setIsOpen(false)}
              >
                Solicitar Presupuesto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
