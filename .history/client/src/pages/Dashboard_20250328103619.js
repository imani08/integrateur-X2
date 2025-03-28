import React from 'react';
import StatsGrid from '../components/StatsGrid';
import AlertFeed from '../components/AlertFeed';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de Bord</h1>
      <StatsGrid />
      <AlertFeed />
    </div>
  );
}