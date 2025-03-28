import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function ActuatorControl({ actuatorId, initialState }) {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const toggleActuator = async () => {
    setLoading(true);
    try {
      const newState = !state;
      await updateDoc(doc(db, 'actuators', actuatorId), { 
        state: newState,
        lastUpdated: new Date().toISOString() 
      });
      setState(newState);
    } catch (error) {
      console.error("Error updating actuator:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleActuator}
      disabled={loading}
      className={`px-4 py-2 rounded-md ${
        state ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
      } text-white transition-colors`}
    >
      {loading ? '...' : state ? 'ACTIF' : 'INACTIF'}
    </button>
  );
}