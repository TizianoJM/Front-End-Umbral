import { motion } from 'motion/react';
import { Bolt, Eye, ShieldCheck } from 'lucide-react';
import { TEAM } from '../constants';

export default function About() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-end">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" 
              alt="Team working" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
            <div className="relative p-8 md:p-16 z-10">
              <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-4">
                Iluminando la Excelencia <br />Desde 1998
              </h1>
              <p className="text-white/90 text-xl max-w-lg">
                Fundador e Ingeniero Principal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-16 text-center">
            <h2 className="text-slate-900 text-3xl md:text-4xl font-bold leading-tight">Nuestra Base Fundamental</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Potenciando su hogar y empresa con un compromiso con la seguridad, la integridad y la innovación con visión de futuro.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Nuestra Misión', icon: Bolt, desc: 'Proporcionar soluciones eléctricas seguras, confiables e innovadoras que mejoren la calidad de vida y la productividad empresarial.' },
              { title: 'Nuestra Visión', icon: Eye, desc: 'Ser el proveedor de servicios eléctricos más confiable y buscado, liderando la transición hacia sistemas de energía inteligentes.' },
              { title: 'Nuestros Valores', icon: ShieldCheck, desc: 'Seguridad Ante Todo, Integridad Inquebrantable, Excelencia Técnica y Satisfacción del Cliente.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm border-t-4 border-t-primary"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="h-8 w-8" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-slate-900 text-xl font-bold">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-12">
            <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Conoce a los Especialistas</h2>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <div key={member.id} className="group">
                <div className="relative overflow-hidden rounded-xl mb-6 bg-slate-100">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-slate-900 text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-3 uppercase tracking-wider">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
