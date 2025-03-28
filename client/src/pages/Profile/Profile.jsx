import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';

const Profile = () => {
  const [user] = useAuthState(auth);

  if (!user) return null;

  return (
    <div className="profile">
      <h2>Profil Utilisateur</h2>
      <div className="profile-info">
        <div className="avatar">
          {user.photoURL ? (
            <img src={user.photoURL} alt="Avatar" />
          ) : (
            <div className="default-avatar">
              {user.displayName?.charAt(0) || user.email?.charAt(0)}
            </div>
          )}
        </div>
        <div className="details">
          <h3>{user.displayName || 'Utilisateur'}</h3>
          <p>{user.email}</p>
          <p>Inscrit depuis: {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;