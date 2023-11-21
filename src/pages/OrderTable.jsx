import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import additional components
import OrderTableHeader from '../components/OrderTableHeader'; // Assuming this component is in a separate file
import OrderTableRow from '../components/OrderTableRow'; // Assuming this component is in a separate file

const OrderTable = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({
    orderNumber: '',
    orderDate: '',
    entryUser: '',
    cse: '',
    owner: '',
    clientName: '',
  });

  useEffect(() => {
    getLatest100Records();
  }, []);

  const getLatest100Records = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getlatest100Records');
      
      if (response.data && Array.isArray(response.data.data)) {
        // Update state only if the response is valid
        setOrderDetails(response.data);
      } else {
        console.error('Invalid API response:', response.data);
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setLoading(false);
    }
  };
  

  const handleSort = (column) => {
    setSortColumn(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (column, value) => {
    setFilters({ ...filters, [column]: value });
  };

  const filteredAndSortedOrders = () => {
    let filteredOrders = orderDetails?.data ? [...orderDetails.data] : [];

    filteredOrders = filteredOrders.filter((order) =>
      Object.entries(filters).every(([key, value]) =>
        order[key].toLowerCase().includes(value.toLowerCase())
      )
    );

    if (sortColumn) {
      filteredOrders.sort((a, b) => {
        const aValue = a[sortColumn].toLowerCase();
        const bValue = b[sortColumn].toLowerCase();
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      });
    }

    return filteredOrders;
  };

  const displayedOrders = filteredAndSortedOrders();

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : displayedOrders && displayedOrders.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <OrderTableHeader column="orderNumber" sortOrder={sortOrder} onSort={handleSort}>
                Order Number
              </OrderTableHeader>
              <OrderTableHeader column="orderDate" sortOrder={sortOrder} onSort={handleSort}>
                Order Date
              </OrderTableHeader>
              <OrderTableHeader column="orderDate" sortOrder={sortOrder} onSort={handleSort}>
                Entry User
              </OrderTableHeader>
              <OrderTableHeader column="orderDate" sortOrder={sortOrder} onSort={handleSort}>
                CSE
              </OrderTableHeader>
              <OrderTableHeader column="orderDate" sortOrder={sortOrder} onSort={handleSort}>
                Owner
              </OrderTableHeader>
              <OrderTableHeader column="orderDate" sortOrder={sortOrder} onSort={handleSort}>
                Client Name
              </OrderTableHeader>
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order) => (
              <OrderTableRow key={order.OrderNumber} order={order} />
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>No order details available</p>
          {/* Render table headers even when no data is available */}
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <OrderTableHeader column="orderNumber" sortOrder={sortOrder} onSort={handleSort}>
                  Order Number
                </OrderTableHeader>
                <OrderTableHeader column="orderDate" sortOrder={sortOrder} onSort={handleSort}>
                  Order Date
                </OrderTableHeader>
                <OrderTableHeader column="orderDate" sortOrder={sortOrder} onSort={handleSort}>
                Entry User
              </OrderTableHeader>
              <OrderTableHeader column="orderDate" sortOrder={sortOrder} onSort={handleSort}>
                CSE
              </OrderTableHeader>
              <OrderTableHeader column="orderDate" sortOrder={sortOrder} onSort={handleSort}>
                Owner
              </OrderTableHeader>
              <OrderTableHeader column="orderDate" sortOrder={sortOrder} onSort={handleSort}>
                Client Name
              </OrderTableHeader>
              </tr>
            </thead>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
