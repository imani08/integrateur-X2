import React, { useState, useEffect } from 'react';
import { updateUserProfile } from '../../services/api';
import { auth } from '../../services/firebase';

const UserSettings = () => {
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      setUserData(prev => ({
        ...prev,
        displayName: auth.currentUser.displayName || '',
        email: auth.currentUser.email || ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (userData.password && userData.password !== userData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      await updateUserProfile({
        displayName: userData.displayName,
        email: userData.email,
        password: userData.password || undefined
      });
      setSuccess('Profil mis à jour avec succès');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="user-settings">
      <h2>Paramètres du Compte</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom d'affichage</label>
          <input
            type="text"
            name="displayName"
            value={userData.displayName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Laisser vide pour ne pas changer"
          />
        </div>
        <div className="form-group">
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UserSettings;