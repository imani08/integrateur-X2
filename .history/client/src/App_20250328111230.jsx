import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import SensorList from "./pages/Sensors/SensorList";
import SensorDetail from "./pages/Sensors/SensorDetail";
import ActuatorList from "./pages/Actuators/ActuatorList";
import ActuatorLogs from "./pages/Actuators/ActuatorLogs";
import AlertList from "./pages/Alerts/AlertList";
import AlertSettings from "./pages/Alerts/AlertSettings";
import UserSettings from "./pages/Settings/UserSettings";
import SystemSettings from "./pages/Settings/SystemSettings";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sensors" element={<SensorList />} />
          <Route path="/sensors/:id" element={<SensorDetail />} />
          <Route path="/actuators" element={<ActuatorList />} />
          <Route path="/actuators/logs" element={<ActuatorLogs />} />
          <Route path="/alerts" element={<AlertList />} />
          <Route path="/alerts/settings" element={<AlertSettings />} />
          <Route path="/settings/user" element={<UserSettings />} />
          <Route path="/settings/system" element={<SystemSettings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
