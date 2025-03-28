import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import DashboardCard from '../components/DashboardCard';
import AlertNotification from '../components/AlertNotification';

export default function Dashboard() {
  const [sensorData, setSensorData] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'sensors'), orderBy('timestamp', 'desc'), limit(1));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setSensorData(snapshot.docs[0].data());
      }
    });

    const alertsQuery = query(collection(db, 'alerts'), orderBy('timestamp', 'desc'), limit(5));
    const unsubscribeAlerts = onSnapshot(alertsQuery, (snapshot) => {
      setAlerts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribe();
      unsubscribeAlerts();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Température" 
          value={sensorData?.temperature} 
          unit="°C" 
        />
        <DashboardCard 
          title="Humidité du sol" 
          value={sensorData?.soilMoisture} 
          unit="%" 
        />
        <DashboardCard 
          title="Niveau de CO2" 
          value={sensorData?.co2} 
          unit="ppm" 
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Alertes récentes</h2>
        <div className="space-y-2">
          {alerts.length > 0 ? (
            alerts.map(alert => (
              <AlertNotification key={alert.id} alert={alert} />
            ))
          ) : (
            <p className="text-gray-500">Aucune alerte récente</p>
          )}
        </div>
      </div>
    </div>
  );
}