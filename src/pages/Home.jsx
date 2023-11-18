import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const Home = () => {
  const [workorders, setWorkorders] = useState([]);
  const [CancelledOrders, setCancelledOrders] = useState(0);
  const [ActiveOrders, setActiveOrders] = useState(0);

  useEffect(() => {
   // GetOrderdeatilsbyorderNo(7485);
    GetOrderDetails();
  }, []);

  const GetOrderdeatilsbyorderNo = (orderNumber) =>{
    fetch(`http://127.0.0.1:8000/api/order-details/${orderNumber}`)
      .then(response => response.json())
      .then(data => {
        // need to code
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const GetOrderDetails = () => {
    fetch('http://127.0.0.1:8000/api/getorderdetails')
      .then(response => response.json())
      .then(data => {
        // Assuming the API response has a structure similar to the static data
        const workordersData = data.success ? data.data : [];
        setWorkorders(workordersData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    // Call the function to create or update the pie chart after workorders and invoices are set
    createPieChart();
  }, [workorders]);

  const createPieChart = () => {
    // Extract data for the chart
    const cancelledOrdersCount = workorders.filter(order => order.CancelFlag === 1).length;
    const activeOrdersCount = workorders.filter(order => order.CancelFlag === 0).length;
  
    // Create the pie chart
    const canvas = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
  
    // Destroy existing chart if it exists
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
        <div className="p-4 bg-blue-500 text-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Total Workorders</h2>
          <p className="text-3xl">{workorders.length}</p>
        </div>
        <div className="p-4 bg-blue-500 text-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Active Workorders</h2>
          <p className="text-3xl">{ActiveOrders}</p>
        </div>
        <div className="p-4 bg-blue-500 text-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Cancelled Workorders</h2>
          <p className="text-3xl">{CancelledOrders}</p>
        </div>
      </div>
      <div className="mt-8">
        <canvas id="pieChart" className="w-1/2 h-1/2 mx-auto"></canvas>
      </div>
    </div>
  );
};

export default Home;
