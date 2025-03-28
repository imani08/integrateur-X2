import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import SensorList from './pages/Sensors/SensorList';
import ActuatorList from './pages/Actuators/ActuatorList';
import AlertList from './pages/Alerts/AlertList';
import UserSettings from './pages/Settings/UserSettings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sensors" element={<SensorList />} />
            <Route path="/actuators" element={<ActuatorList />} />
            <Route path="/alerts" element={<AlertList />} />
            <Route path="/settings" element={<UserSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}