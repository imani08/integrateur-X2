import React from 'react';
import { toggleActuator } from '../../services/api';

const ActuatorControl = ({ actuator }) => {
  const handleToggle = async () => {
    await toggleActuator(actuator.id);
  };

  return (
    <div className="actuator-control">
      <h3>{actuator.name}</h3>
      <p>Statut: {actuator.status ? 'Actif' : 'Inactif'}</p>
      <button 
        onClick={handleToggle}
        className={actuator.status ? 'active' : ''}
      >
        {actuator.status ? 'Désactiver' : 'Activer'}
      </button>
    </div>
  );
};

export default ActuatorControl;