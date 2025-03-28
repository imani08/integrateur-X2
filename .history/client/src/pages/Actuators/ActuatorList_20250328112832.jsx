import React, { useEffect, useState } from 'react';
import { getActuators, toggleActuator } from '../../services/api';

const ActuatorList = () => {
  const [actuators, setActuators] = useState([]);

  useEffect(() => {
    const fetchActuators = async () => {
      const data = await getActuators();
      setActuators(data);
    };
    fetchActuators();
  }, []);

  const handleToggle = async (id) => {
    await toggleActuator(id);
    const updatedActuators = actuators.map(actuator => 
      actuator.id === id ? { ...actuator, status: !actuator.status } : actuator
    );
    setActuators(updatedActuators);
  };

  return (
    <div className="actuator-list">
      <h2>Liste des Actionneurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {actuators.map((actuator) => (
            <tr key={actuator.id}>
              <td>{actuator.name}</td>
              <td>{actuator.type}</td>
              <td>{actuator.status ? 'Actif' : 'Inactif'}</td>
              <td>
                <button onClick={() => handleToggle(actuator.id)}>
                  {actuator.status ? 'Désactiver' : 'Activer'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActuatorList;