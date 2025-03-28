import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActuatorLogs } from '../../services/api';

const ActuatorLogs = () => {
  const { id } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await getActuatorLogs(id);
      setLogs(data);
    };
    fetchLogs();
  }, [id]);

  return (
    <div className="actuator-logs">
      <h2>Journal des Actions</h2>
      <table>
        <thead>
          <tr>
            <th>Date/Heure</th>
            <th>Action</th>
            <th>Utilisateur</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.timestamp}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.action}</td>
              <td>{log.user || 'Système'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActuatorLogs;