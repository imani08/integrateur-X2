import React from "react";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <div>
      <h2>Tableau de bord</h2>
      <DashboardCard title="Capteurs actifs" value="12" />
      <DashboardCard title="Alertes en cours" value="3" />
    </div>
  );
}

export default Dashboard;
