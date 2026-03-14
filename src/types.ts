export interface Project {
  id: string;
  title: string;
  category: 'Residencial' | 'Comercial' | 'Industrial' | 'Infraestructura' | 'Renovables';
  description: string;
  fullDescription: string;
  image: string;
  scope: string[];
  specs: {
    sector: string;
    location: string;
    client: string;
    status: string;
    power?: string;
    pue?: string;
    redundancy?: string;
    surface?: string;
  };
  gallery: string[];
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}
