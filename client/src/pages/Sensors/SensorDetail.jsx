import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSensorHistory } from '../../services/api';

const SensorDetail = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getSensorHistory(id);
      setHistory(data);
    };
    fetchHistory();
  }, [id]);

  return (
    <div className="sensor-detail">
      <h2>Historique du Capteur</h2>
      <div className="history-chart">
        {/* Ici intégrer un graphique avec une librairie comme Chart.js */}
        {history.map((entry) => (
          <div key={entry.timestamp} className="history-entry">
            <span>{new Date(entry.timestamp).toLocaleString()}</span>
            <span>{entry.value} {entry.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SensorDetail;