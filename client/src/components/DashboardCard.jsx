import React from 'react';

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="dashboard-card">
      <div className="card-icon">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;