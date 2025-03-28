import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">Agriculture Intelligente</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/sensors">Capteurs</Link>
        <Link to="/actuators">Actionneurs</Link>
        <Link to="/alerts">Alertes</Link>
        <Link to="/settings">Paramètres</Link>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    </nav>
  );
};

export default Navbar;