// Dashboard.tsx

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart>();

  useEffect(() => {
    const dateLabels = ['2022-03-01', '2022-03-02', '2022-03-03'];
    const dataValues = [10, 20, 30];
    // Create or update the chart when the component mounts or updates
    if (chartRef.current) {
      // Destroy the existing chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: dateLabels,
            datasets: [
              {
                label: 'Sales',
                data: dataValues,
                backgroundColor: ['rgba(189, 154, 72, 0.2)'],
                borderColor: ['rgba(189, 154, 72, 1)'],
                borderWidth: 2,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="Dashboard-app">
      <div className="Dashboard-main-content">
        <canvas ref={chartRef}></canvas>
        
        {/* Divider line */}
        <hr className="Dashboard-divider" />

        {/* Buttons */}
        <div className="Dashboard-buttons">
          <button className="Dashboard-button">
            <span className="Dashboard-button-text">
              <span className="Dashboard-button-bold">0</span> Pending Orders
            </span>
          </button>
          <button className="Dashboard-button Dashboard-button-second">
            <span className="Dashboard-button-text">
              <span className="Dashboard-button-bold">0</span> Total Orders
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
