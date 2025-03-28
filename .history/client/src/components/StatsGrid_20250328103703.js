import { useSensorData } from '../hooks/useSensorData';

export default function StatsGrid() {
  const { temperature, humidity } = useSensorData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard title="Température" value={`${temperature}°C`} />
      <StatCard title="Humidité" value={`${humidity}%`} />
    </div>
  );
}