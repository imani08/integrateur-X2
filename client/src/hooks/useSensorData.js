import { useState, useEffect } from 'react';
import { subscribeToSensorData } from '../services/sensorService';

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToSensorData((data) => {
      setSensorData(data);
    });
    return unsubscribe;
  }, []);

  return sensorData;
};