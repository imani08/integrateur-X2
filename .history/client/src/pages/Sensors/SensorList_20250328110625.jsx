import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';

export default function SensorList() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'sensors'),
      orderBy('timestamp', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSensorData(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate().toLocaleString()
      })));
    });

    return unsubscribe;
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Données des Capteurs</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Température (°C)</th>
              <th className="py-3 px-4 text-left">Humidité Sol (%)</th>
              <th className="py-3 px-4 text-left">CO₂ (ppm)</th>
              <th className="py-3 px-4 text-left">Luminosité (lux)</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((data) => (
              <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{data.timestamp}</td>
                <td className="py-3 px-4">{data.temperature}</td>
                <td className="py-3 px-4">{data.soilMoisture}</td>
                <td className="py-3 px-4">{data.co2}</td>
                <td className="py-3 px-4">{data.light}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}