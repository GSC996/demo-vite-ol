// src/hooks/useConfig.js
import { useEffect, useState } from 'react';
import configData from '../config/map-config.json';

export function useConfig() {
  const [config, setConfig] = useState(configData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Podría extenderse para cargar la configuración desde una API externa si es necesario
      setConfig(configData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  return { config, loading, error };
}