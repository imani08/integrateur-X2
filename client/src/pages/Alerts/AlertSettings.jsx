import React, { useState, useEffect } from 'react';
import { getAlertSettings, updateAlertSettings } from '../../services/api';

const AlertSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: false,
    pushNotifications: false,
    thresholds: {}
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getAlertSettings();
      setSettings(data);
      setIsLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleThresholdChange = (param, value) => {
    setSettings(prev => ({
      ...prev,
      thresholds: {
        ...prev.thresholds,
        [param]: parseFloat(value)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await updateAlertSettings(settings);
    setIsLoading(false);
    alert('Paramètres d\'alerte mis à jour');
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="alert-settings">
      <h2>Paramètres des Alertes</h2>
      <form onSubmit={handleSubmit}>
        <div className="notification-settings">
          <h3>Notifications</h3>
          <label>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
            Notifications par email
          </label>
          <label>
            <input
              type="checkbox"
              name="pushNotifications"
              checked={settings.pushNotifications}
              onChange={handleChange}
            />
            Notifications push
          </label>
        </div>

        <div className="threshold-settings">
          <h3>Seuils d'Alerte</h3>
          {Object.entries(settings.thresholds).map(([param, value]) => (
            <div key={param} className="form-group">
              <label>{param}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => handleThresholdChange(param, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default AlertSettings;