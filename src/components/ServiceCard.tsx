import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, Building2, Factory } from 'lucide-react';
import { Service } from '../types';

const ICON_MAP: Record<string, any> = {
  Home: Home,
  Building2: Building2,
  Factory: Factory,
};

export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const Icon = ICON_MAP[service.icon] || Home;

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200 hover:-translate-y-2 transition-transform duration-300 shadow-sm">
      <div className="h-48 w-full overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-8 flex flex-col gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {service.description}
        </p>
        <ul className="flex flex-col gap-2 text-slate-600 text-sm">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary shrink-0" /> {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
