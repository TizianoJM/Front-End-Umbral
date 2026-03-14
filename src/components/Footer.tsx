import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Logo className="h-10 w-auto" />
              <div className="flex flex-col -space-y-1">
                <span className="text-xl font-black tracking-tighter text-white uppercase">Umbral</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Ingeniería</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Ofreciendo servicios de ingeniería eléctrica de primer nivel para clientes residenciales, comerciales e industriales desde 1998.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-primary cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Nuestros Servicios</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><HashLink smooth to="/#services" className="hover:text-primary">Cableado Residencial</HashLink></li>
              <li><HashLink smooth to="/#services" className="hover:text-primary">Mantenimiento Comercial</HashLink></li>
              <li><HashLink smooth to="/#services" className="hover:text-primary">Soluciones Industriales</HashLink></li>
              <li><HashLink smooth to="/#services" className="hover:text-primary">Reparaciones de Emergencia</HashLink></li>
              <li><HashLink smooth to="/#services" className="hover:text-primary">Auditorías Eléctricas</HashLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Compañía</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/nosotros" className="hover:text-primary">Sobre Nosotros</Link></li>
              <li><Link to="/proyectos" className="hover:text-primary">Galería de Proyectos</Link></li>
              <li><Link to="/nosotros" className="hover:text-primary">Testimonios</Link></li>
              <li><Link to="/contacto" className="hover:text-primary">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contacto</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>123 Power Lane, Electric City, EL 54321</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>(555) 012-3456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@umbral.cl</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-xs">
          <p>© 2024 Umbral Ingeniería. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
