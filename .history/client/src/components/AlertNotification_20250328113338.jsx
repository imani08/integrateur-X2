import React from 'react';

const AlertNotification = ({ alert }) => {
  return (
    <div className={`alert-notification ${alert.severity}`}>
      <div className="alert-header">
        <h4>{alert.title}</h4>
        <span className="alert-time">
          {new Date(alert.timestamp).toLocaleTimeString()}
        </span>
      </div>
      <p>{alert.message}</p>
    </div>
  );
};

export default AlertNotification;