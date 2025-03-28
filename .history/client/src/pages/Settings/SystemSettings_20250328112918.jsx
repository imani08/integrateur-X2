import React, { useState, useEffect } from 'react';
import { getSystemSettings, updateSystemSettings } from '../../services/api';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    irrigationThreshold: 0,
    temperatureThreshold: 0,
    co2Threshold: 0,
    lightThreshold: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSystemSettings();
      setSettings(data);
      setIsLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await updateSystemSettings(settings);
    setIsLoading(false);
    alert('Paramètres mis à jour avec succès');
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="system-settings">
      <h2>Paramètres du Système</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Seuil d'irrigation (%)</label>
          <input
            type="number"
            name="irrigationThreshold"
            value={settings.irrigationThreshold}
            onChange={handleChange}
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label>Seuil de température (°C)</label>
          <input
            type="number"
            name="temperatureThreshold"
            value={settings.temperatureThreshold}
            onChange={handleChange}
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label>Seuil de CO₂ (ppm)</label>
          <input
            type="number"
            name="co2Threshold"
            value={settings.co2Threshold}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Seuil de luminosité (lux)</label>
          <input
            type="number"
            name="lightThreshold"
            value={settings.lightThreshold}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default SystemSettings;