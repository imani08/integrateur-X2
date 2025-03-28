import React, { useEffect, useState } from 'react';
import { getSensors } from '../../services/api';

const SensorList = () => {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const fetchSensors = async () => {
      const data = await getSensors();
      setSensors(data);
    };
    fetchSensors();
  }, []);

  return (
    <div className="sensor-list">
      <h2>Liste des Capteurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Valeur</th>
            <th>Dernière mise à jour</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor.id}>
              <td>{sensor.name}</td>
              <td>{sensor.type}</td>
              <td>{sensor.value} {sensor.unit}</td>
              <td>{new Date(sensor.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorList;