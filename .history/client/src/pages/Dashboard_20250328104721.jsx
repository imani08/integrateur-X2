import { useSensorData } from '../hooks/useSensors';
import DashboardCard from '../components/DashboardCard';

export default function Dashboard() {
  const { temperature, humidity, soilMoisture, co2 } = useSensorData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <DashboardCard title="Température" value={temperature} unit="°C" />
      <DashboardCard title="Humidité" value={humidity} unit="%" />
      <DashboardCard title="Humidité Sol" value={soilMoisture} unit="%" />
      <DashboardCard title="CO2" value={co2} unit="ppm" />
    </div>
  );
}