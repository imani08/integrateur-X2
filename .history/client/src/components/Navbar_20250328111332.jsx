import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/sensors">Capteurs</Link></li>
        <li><Link to="/actuators">Actionneurs</Link></li>
        <li><Link to="/alerts">Alertes</Link></li>
        <li><Link to="/settings/user">Paramètres</Link></li>
        <li><Link to="/profile">Profil</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;