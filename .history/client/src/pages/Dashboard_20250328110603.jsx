import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import DashboardCard from '../components/DashboardCard';

export default function Dashboard() {
  const [sensorData, setSensorData] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const sensorQuery = query(
      collection(db, 'sensors'),
      orderBy('timestamp', 'desc'),
      limit(1)
    );
    
    const alertQuery = query(
      collection(db, 'alerts'),
      orderBy('timestamp', 'desc'),
      limit(5)
    );

    const unsubscribeSensor = onSnapshot(sensorQuery, (snapshot) => {
      if (!snapshot.empty) setSensorData(snapshot.docs[0].data());
    });

    const unsubscribeAlert = onSnapshot(alertQuery, (snapshot) => {
      setAlerts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeSensor();
      unsubscribeAlert();
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Tableau de Bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Température" 
          value={sensorData?.temperature} 
          unit="°C" 
          icon="thermometer"
        />
        <DashboardCard 
          title="Humidité Sol" 
          value={sensorData?.soilMoisture} 
          unit="%" 
          icon="water"
        />
        <DashboardCard 
          title="Niveau CO₂" 
          value={sensorData?.co2} 
          unit="ppm" 
          icon="co2"
        />
        <DashboardCard 
          title="Luminosité" 
          value={sensorData?.light} 
          unit="lux" 
          icon="light"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Alertes Récentes</h2>
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <AlertNotification key={alert.id} alert={alert} />
          ))
        ) : (
          <p className="text-gray-500">Aucune alerte récente</p>
        )}
      </div>
    </div>
  );
}