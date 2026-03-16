import { useState, useEffect } from 'react';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { PROJECTS as STATIC_PROJECTS, SERVICES as STATIC_SERVICES } from '../constants';
import { Project, Service } from '../types';

export function useSiteData() {
  const [config, setConfig] = useState({ 
    homeHeaderPhoto: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200'
  });
  const [services, setServices] = useState<Service[]>(STATIC_SERVICES);
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to site config
    const unsubConfig = onSnapshot(doc(db, 'config', 'site'), (docSnap) => {
      if (docSnap.exists()) {
        setConfig(prev => ({ ...prev, ...docSnap.data() }));
      }
    }, (error) => {
      console.warn("Config fetch failed, using defaults", error);
    });

    // Listen to services
    const unsubServices = onSnapshot(collection(db, 'services'), (querySnap) => {
      if (!querySnap.empty) {
        const fetchedServices = querySnap.docs.map(doc => ({ ...doc.data() } as Service));
        setServices(fetchedServices);
      }
    }, (error) => {
      console.warn("Services fetch failed, using defaults", error);
    });

    // Listen to projects
    const unsubProjects = onSnapshot(collection(db, 'projects'), (querySnap) => {
      if (!querySnap.empty) {
        const fetchedProjects = querySnap.docs.map(doc => ({ ...doc.data() } as Project));
        setProjects(fetchedProjects);
      }
    }, (error) => {
      console.warn("Projects fetch failed, using defaults", error);
    });

    setLoading(false);

    return () => {
      unsubConfig();
      unsubServices();
      unsubProjects();
    };
  }, []);

  return { config, services, projects, loading };
}
