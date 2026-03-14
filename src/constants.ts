import { Project, Service, TeamMember } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'metropolitan-data-center',
    title: 'Metropolitan Data Center',
    category: 'Industrial',
    description: 'Instalación completa de infraestructura eléctrica que incluye sistemas de energía de respaldo Tier 4.',
    fullDescription: 'Este proyecto consistió en el diseño, implementación y puesta en marcha de la infraestructura eléctrica completa para el nuevo Centro de Datos Metropolitano. El desafío principal fue garantizar un tiempo de actividad del 99.99% (Tier IV), integrando sistemas redundantes de respaldo y gestión energética inteligente.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
    scope: [
      'Instalación de Subestación de 2.5 MVA.',
      'Sistemas UPS de redundancia N+1.',
      'Generadores Diesel de respaldo automático.',
      'Sistema de monitoreo de energía en tiempo real (SCADA).',
      'Sistemas de extinción de incendios FM-200.',
      'Certificación Tier IV TIA-942.'
    ],
    specs: {
      sector: 'Industrial / Tecnológico',
      location: 'Santiago, Chile',
      client: 'DataCorp S.A.',
      status: 'Completado (2023)',
      power: '2.5 MW',
      pue: '1.25',
      redundancy: '2N + 1',
      surface: '1,200 m²'
    },
    gallery: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    id: 'sunshine-estates',
    title: 'Sunshine Estates Smart Grid',
    category: 'Residencial',
    description: 'Sistemas eléctricos integrados para el hogar inteligente en 50 villas de lujo.',
    fullDescription: 'Implementación de una red eléctrica inteligente para un complejo residencial de lujo, permitiendo el control total de la energía, integración con paneles solares y sistemas de automatización avanzada.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    scope: [
      'Instalación de paneles solares en 50 unidades.',
      'Sistema de gestión de energía centralizado.',
      'Automatización de iluminación y climatización.',
      'Infraestructura de carga para vehículos eléctricos.'
    ],
    specs: {
      sector: 'Residencial',
      location: 'Costa del Sol, España',
      client: 'Sunshine Developers',
      status: 'Completado (2024)'
    },
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    id: 'horizon-solar-farm',
    title: 'Horizon Solar Farm',
    category: 'Renovables',
    description: 'Instalación de sistemas de conversión de CC a CA e infraestructura de conexión a la red.',
    fullDescription: 'Proyecto de gran escala para la conexión de una planta solar de 20MW a la red nacional, incluyendo subestaciones y sistemas de protección.',
    image: 'https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=800',
    scope: [
      'Instalación de inversores de potencia.',
      'Construcción de subestación elevadora.',
      'Sistemas de monitoreo remoto.',
      'Protecciones de red de alta tensión.'
    ],
    specs: {
      sector: 'Energía / Renovables',
      location: 'Desierto de Atacama, Chile',
      client: 'EcoEnergy Global',
      status: 'Completado (2022)',
      power: '20 MW'
    },
    gallery: [
      'https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=400'
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'residencial',
    title: 'Residencial',
    icon: 'Home',
    description: 'Servicios eléctricos completos para su hogar, desde reparaciones hasta automatización.',
    features: [
      'Integración de Hogar Inteligente',
      'Iluminación y Ventiladores',
      'Actualización de Paneles'
    ],
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'comercial',
    title: 'Comercial',
    icon: 'Building2',
    description: 'Soluciones eléctricas robustas para oficinas, tiendas y edificios comerciales.',
    features: [
      'Equipamiento de Oficinas',
      'Iluminación de Emergencia',
      'Cableado de Datos y Red'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'industrial',
    title: 'Industrial',
    icon: 'Factory',
    description: 'Infraestructura eléctrica de alta potencia para fábricas y centros logísticos.',
    features: [
      'Cableado de Maquinaria',
      'Mantenimiento Preventivo',
      'Sistemas de Alto Voltaje'
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  }
];

export const TEAM: TeamMember[] = [
  {
    id: 'robert-chen',
    name: 'Robert Chen',
    role: 'Fundador e Ingeniero Principal',
    description: 'Más de 25 años de experiencia en sistemas eléctricos industriales a gran escala y gestión de proyectos de ingeniería.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Ingeniera Sénior de Proyectos',
    description: 'Experta en automatización avanzada, integración de sistemas inteligentes y optimización de eficiencia energética.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'marcus-thorne',
    name: 'Marcus Thorne',
    role: 'Director de Infraestructura',
    description: 'Especializado en redes eléctricas comerciales, sistemas de respaldo crítico y cumplimiento normativo internacional.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'elena-rodriguez',
    name: 'Elena Rodriguez',
    role: 'Consultora en Energías Renovables',
    description: 'Especialista en diseño de plantas fotovoltaicas e infraestructura de electromovilidad a gran escala.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  }
];
