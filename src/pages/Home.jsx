import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

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
      createCharts(workordersData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const createCharts = (workordersData) => {
    const cancelledOrdersCount = workordersData.filter(order => order.CancelFlag === 1).length;
    const activeOrdersCount = workordersData.filter(order => order.CancelFlag === 0).length;

    createChart('pie', 'pieChart', [cancelledOrdersCount, activeOrdersCount]);
    createChart('bar', 'barChart', [cancelledOrdersCount, activeOrdersCount]);
    createChart('doughnut', 'doughnutChart', [cancelledOrdersCount, activeOrdersCount]);
  };

  const createChart = (chartType, chartId, chartData) => {
    const chartElement = document.getElementById(chartId);
    const context = chartElement.getContext('2d');

    Chart.getChart(context)?.destroy();

    new Chart(context, {
      type: chartType,
      data: {
        labels: ['Cancelled Workorders', 'Active Workorders'],
        datasets: [
          {
            data: chartData,
            backgroundColor: ['rgb(245 158 11)', 'rgb(251 191 36)'],
          },
        ],
      },
    });
  };

  const totalWorkorders = workorders.length;
  const activeWorkorders = workorders.filter(order => order.CancelFlag === 0).length;
  const cancelledWorkorders = workorders.filter(order => order.CancelFlag === 1).length;

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Baleen Media Dashboard</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-amber-500 text-black rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Total Workorders</h2>
          <p className="text-3xl">{totalWorkorders}</p>
        </div>
        <div className="p-4 bg-amber-500 text-black rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Active Workorders</h2>
          <p className="text-3xl">{activeWorkorders}</p>
        </div>
        <div className="p-4 bg-amber-500 text-black rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Cancelled Workorders</h2>
          <p className="text-3xl">{cancelledWorkorders}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex">
          <div className="w-1/2 p-4">
            <h2 className="text-center mb-4">Pie Chart</h2>
            <canvas id="pieChart" className="w-full h-40 mx-auto"></canvas>
          </div>
          <div className='w-1/2 p-4'>
            <h2 className="text-center mb-4 mt-4">Doughnut Chart</h2>
            <canvas id="doughnutChart" className="w-full h-40 mx-auto"></canvas>
          </div>
        </div>
        <div className='w-full'>
          <h2 className="text-center mb-4 mt-4">Bar Chart</h2>
          <canvas id="barChart" className="w-full h-40 mx-auto"></canvas>
        </div>
      </div>

    </div>
  );
};

export default Home;
