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
      createPieAndBarCharts(workordersData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const createChart = (chartType, chartData) => {
    const chartElement = document.getElementById(chartType + 'Chart');
    const context = chartElement.getContext('2d');

    Chart.getChart(context)?.destroy();

    new Chart(context, {
      type: chartType,
      data: {
        labels: ['Cancelled Workorders', 'Active Workorders'],
        datasets: [
          {
            data: chartData,
            backgroundColor: ['#FF6384', '#36A2EB'],
          },
        ],
      },
    });
  };

  const createPieAndBarCharts = (workordersData) => {
    const cancelledOrdersCount = workordersData.filter(order => order.CancelFlag === 1).length;
    const activeOrdersCount = workordersData.filter(order => order.CancelFlag === 0).length;

    createChart('pie', [cancelledOrdersCount, activeOrdersCount]);
    createChart('bar', [cancelledOrdersCount, activeOrdersCount]);
    createChart('doughnut', [cancelledOrdersCount, activeOrdersCount]);
    createChart('polarArea', [cancelledOrdersCount, activeOrdersCount]);
  };


  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Baleen Media Dashboard</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-500 text-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Total Workorders</h2>
          <p className="text-3xl">{workorders.length}</p>
        </div>
        <div className="p-4 bg-blue-500 text-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Active Workorders</h2>
          <p className="text-3xl">{workorders.filter(order => order.CancelFlag === 0).length}</p>
        </div>
        <div className="p-4 bg-blue-500 text-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Cancelled Workorders</h2>
          <p className="text-3xl">{workorders.filter(order => order.CancelFlag === 1).length}</p>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex">
          <div className="w-1/2">
            <h2 className="text-center mb-4">Pie Chart</h2>
            <canvas id="pieChart" className="w-full h-40 mx-auto"></canvas>
            <h2 className="text-center mb-4 mt-4">Doughnut Chart</h2>
            <canvas id="doughnutChart" className="w-full h-40 mx-auto"></canvas>            
          </div>
          <div className='w-1/2'>
            <h2 className="text-center mb-4">Polar Area Chart</h2>
            <canvas id="polarAreaChart" className="w-full h-40 mx-auto"></canvas>
            <h2 className="text-center mb-4 mt-4">Bar Chart</h2>
            <canvas id="barChart" className="w-full h-40 mx-auto"></canvas>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
