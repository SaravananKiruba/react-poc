import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Home = () => {
  const [workorders, setWorkorders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getorderdetails');
      const workordersData = response.data.success ? response.data.data : [];
      setWorkorders(workordersData);
      createPieChart(workordersData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const createPieChart = (workordersData) => {
    const cancelledOrdersCount = workordersData.filter(order => order.CancelFlag === 1).length;
    const activeOrdersCount = workordersData.filter(order => order.CancelFlag === 0).length;

    const canvas = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
    Chart.getChart(ctx)?.destroy();

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Cancelled Workorders', 'Active Workorders'],
        datasets: [
          {
            data: [cancelledOrdersCount, activeOrdersCount],
            backgroundColor: ['#FF6384', '#36A2EB'],
          },
        ],
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Baleen Media Dashboard</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Workorders */}
        <div className="p-4 bg-blue-500 text-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Total Workorders</h2>
          <p className="text-3xl">{workorders.length}</p>
        </div>
        {/* Active Workorders */}
        <div className="p-4 bg-blue-500 text-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Active Workorders</h2>
          <p className="text-3xl">{workorders.filter(order => order.CancelFlag === 0).length}</p>
        </div>
        {/* Cancelled Workorders */}
        <div className="p-4 bg-blue-500 text-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Cancelled Workorders</h2>
          <p className="text-3xl">{workorders.filter(order => order.CancelFlag === 1).length}</p>
        </div>
      </div>
      {/* Pie Chart */}
      <div className="mt-8">
        <canvas id="pieChart" className="w-1/2 h-1/2 mx-auto"></canvas>
      </div>
    </div>
  );
};

export default Home;
