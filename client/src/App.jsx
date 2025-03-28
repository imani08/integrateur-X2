import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import SensorList from './pages/Sensors/SensorList';
import SensorDetail from './pages/Sensors/SensorDetail';
import ActuatorList from './pages/Actuators/ActuatorList';
import ActuatorLogs from './pages/Actuators/ActuatorLogs';
import AlertList from './pages/Alerts/AlertList';
import AlertSettings from './pages/Alerts/AlertSettings';
import UserSettings from './pages/Settings/UserSettings';
import SystemSettings from './pages/Settings/SystemSettings';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/sensors" element={<PrivateRoute><SensorList /></PrivateRoute>} />
            <Route path="/sensors/:id" element={<PrivateRoute><SensorDetail /></PrivateRoute>} />
            <Route path="/actuators" element={<PrivateRoute><ActuatorList /></PrivateRoute>} />
            <Route path="/actuators/:id/logs" element={<PrivateRoute><ActuatorLogs /></PrivateRoute>} />
            <Route path="/alerts" element={<PrivateRoute><AlertList /></PrivateRoute>} />
            <Route path="/alerts/settings" element={<PrivateRoute><AlertSettings /></PrivateRoute>} />
            <Route path="/settings/user" element={<PrivateRoute><UserSettings /></PrivateRoute>} />
            <Route path="/settings/system" element={<PrivateRoute><SystemSettings /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;