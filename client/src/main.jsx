import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { auth } from './services/firebase';
import reportWebVitals from './reportWebVitals';
import './index.css';

// Initialisation de Firebase
auth.onAuthStateChanged(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});

reportWebVitals();