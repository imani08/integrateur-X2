import React, { useEffect, useState } from 'react';
import { getAlerts } from '../../services/api';

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const data = await getAlerts();
      setAlerts(data);
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="alert-list">
      <h2>Alertes Récentes</h2>
      <div className="alert-container">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert ${alert.severity}`}>
            <h3>{alert.title}</h3>
            <p>{alert.message}</p>
            <small>{new Date(alert.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertList;