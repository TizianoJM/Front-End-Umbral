import { motion } from 'motion/react';
import { ArrowRight, Star, Verified, Phone, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useSiteData } from '../hooks/useSiteData';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard } from '../components/ProjectCard';

const WHY_CHOOSE_US = [
  { title: 'Excelencia Técnica', desc: 'Ingeniería de precisión respaldada por certificaciones internacionales y años de experiencia en el sector.', icon: ShieldCheck },
  { title: 'Compromiso y Plazos', desc: 'Gestión eficiente de proyectos garantizando el cumplimiento de cronogramas y presupuestos acordados.', icon: Clock },
  { title: 'Soluciones a Medida', desc: 'Diseños personalizados que se adaptan a las necesidades específicas de cada cliente e infraestructura.', icon: CreditCard }
];

export default function Home() {
  const { config, services, projects } = useSiteData();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-8 lg:w-1/2"
            >
              <div className="flex flex-col gap-4">
                <span className="text-primary font-bold tracking-widest text-xs uppercase">Ingeniería Eléctrica de Vanguardia</span>
                <h1 className="text-navy text-4xl md:text-6xl font-black leading-tight tracking-tight">
                  Potenciando su <span className="text-primary">Infraestructura</span> con Innovación
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
                  Soluciones integrales de ingeniería eléctrica para sectores industriales, comerciales y residenciales de alta gama. Diseño, ejecución y mantenimiento con estándares internacionales.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/contacto"
                  className="flex min-w-[160px] items-center justify-center rounded-lg h-14 px-6 bg-primary text-white text-base font-bold transition-transform active:scale-95"
                >
                  Presupuesto Gratuito
                </Link>
                <HashLink 
                  smooth
                  to="/#services"
                  className="flex min-w-[160px] items-center justify-center rounded-lg h-14 px-6 border-2 border-slate-200 text-slate-900 text-base font-bold hover:bg-slate-50 transition-colors"
                >
                  Nuestros Servicios
                </HashLink>
              </div>
              <div className="flex items-center gap-4 py-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Testimonial" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">Más de 500 Clientes Satisfechos</p>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border-8 border-white">
                <img 
                  src={config.homeHeaderPhoto} 
                  alt="Electrician working" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur rounded-xl border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <Verified className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Respuesta Rápida</p>
                      <p className="text-sm font-bold text-slate-900">Servicios de Emergencia 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">¿Por qué elegir Umbral Ingeniería?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Combinamos excelencia técnica con un compromiso inquebrantable con la calidad para ofrecer las mejores soluciones de ingeniería eléctrica.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-slate-100 shadow-sm"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Servicios Integrales</h2>
              <p className="text-slate-600 max-w-xl">
                Desde pequeñas reparaciones hasta complejas instalaciones industriales, tenemos la experiencia para manejar cualquier desafío eléctrico.
              </p>
            </div>
            <HashLink smooth to="/#services" className="text-primary font-bold flex items-center gap-2 hover:underline">
              Ver todos los servicios <ArrowRight className="h-4 w-4" />
            </HashLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-slate-50" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Proyectos Destacados</h2>
            <p className="text-slate-600">Vea cómo hemos impulsado nuestra comunidad local con excelencia.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6">¿Listo para comenzar su proyecto?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            No arriesgue su seguridad con trabajos eléctricos improvisados. Contrate a los expertos de Umbral Ingeniería para un trabajo profesional garantizado.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contacto" className="bg-white text-primary hover:bg-slate-100 px-10 py-4 rounded-lg font-bold text-lg transition-colors">
              Reservar en Línea
            </Link>
            <a href="tel:5550123456" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" /> Llamar al (555) 012-3456
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
