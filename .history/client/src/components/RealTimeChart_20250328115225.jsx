import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RealTimeChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map((_, index) => index),
          datasets: [{
            label: 'Valeur du capteur',
            data: data.map(item => item.value),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default RealTimeChart;