import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const Home = () => {
  const [workorders, setWorkorders] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const workordersData = [
      { id: 1, title: 'Kiruba Order', status: 'Pending' },
      { id: 2, title: 'Kiruba Order', status: 'Pending' },
      { id: 3, title: 'Kiruba Order', status: 'Pending' },
      { id: 4, title: 'Kiruba Order', status: 'Pending' },
      { id: 5, title: 'Workorder 2', status: 'Completed' },
      { id: 6, title: 'Workorder 2', status: 'Completed' },
      { id: 7, title: 'Workorder 2', status: 'Completed' },
      { id: 8, title: 'Workorder 2', status: 'Completed' },
      { id: 9, title: 'Workorder 2', status: 'Completed' },
    ];

    const invoicesData = [
      { id: 101, amount: 100.00, status: 'Paid' },
      { id: 102, amount: 150.50, status: 'Pending' },
      { id: 103, amount: 100.00, status: 'Paid' },
      { id: 104, amount: 100.00, status: 'Paid' },
      { id: 105, amount: 100.00, status: 'Paid' },
      { id: 106, amount: 100.00, status: 'Paid' },
      { id: 107, amount: 150.50, status: 'Pending' },
      { id: 108, amount: 150.50, status: 'Pending' },
      { id: 109, amount: 150.50, status: 'Pending' },
    ];

    setWorkorders(workordersData);
    setInvoices(invoicesData);
  }, []); // Empty dependency array means this effect runs once after the initial render

  useEffect(() => {
    // Call the function to create or update the pie chart after workorders and invoices are set
    createPieChart();
  }, [workorders, invoices]);

  const createPieChart = () => {
    // Get the canvas element from the DOM
    const canvas = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    Chart.getChart(ctx)?.destroy();

    // Extract data for the chart
    const workordersPending = workorders.filter((order) => order.status === 'Pending').length;
    const workordersCompleted = workorders.filter((order) => order.status === 'Completed').length;
    const invoicesPaid = invoices.filter((invoice) => invoice.status === 'Paid').length;
    const invoicesPending = invoices.filter((invoice) => invoice.status === 'Pending').length;

    // Create the pie chart
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Workorders Pending', 'Workorders Completed', 'Invoices Paid', 'Invoices Pending'],
        datasets: [
          {
            data: [workordersPending, workordersCompleted, invoicesPaid, invoicesPending],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
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
        <div className="p-4 bg-green-500 text-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Total Invoices</h2>
          <p className="text-3xl">{invoices.length}</p>
        </div>
      </div>
      <div className="mt-8">
        <canvas id="pieChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
};

export default Home;
