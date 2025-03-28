import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import { getSensorData } from '../services/api';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    co2: 0,
    light: 0,
    waterLevel: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSensorData();
      setSensorData(data);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1>Tableau de Bord</h1>
      <div className="dashboard-grid">
        <DashboardCard 
          title="Température" 
          value={`${sensorData.temperature}°C`} 
          icon="thermometer" 
        />
        <DashboardCard 
          title="Humidité du sol" 
          value={`${sensorData.humidity}%`} 
          icon="water" 
        />
        <DashboardCard 
          title="Niveau de CO₂" 
          value={`${sensorData.co2} ppm`} 
          icon="cloud" 
        />
        <DashboardCard 
          title="Luminosité" 
          value={`${sensorData.light} lux`} 
          icon="sun" 
        />
        <DashboardCard 
          title="Niveau d'eau" 
          value={`${sensorData.waterLevel}%`} 
          icon="droplet" 
        />
      </div>
    </div>
  );
};

export default Dashboard;