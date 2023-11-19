import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      setOrderDetails(response.data);
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
  const FilterInput = ({ value, onChange, placeholder }) => {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-2 py-1 border rounded-md"
      />
    );
  };
  
  // ...
  
  // Inside OrderTable component
  const FilterRow = () => {
    return (
      <div className="flex mb-4">
        {/* ... Other filters */}
        <FilterInput
          value={filters.orderNumber}
          onChange={(value) => handleFilterChange('orderNumber', value)}
          placeholder="Filter Order Number"
        />
        {/* ... Other filters */}
      </div>
    );
  };
  const TableHeader = ({ column, children }) => (
    <th
      className="py-2 px-4 border-b font-bold bg-gray-200 cursor-pointer"
      onClick={() => handleSort(column)}
    >
      {children} {sortColumn === column && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
  );
  
  // ...
  
  // Inside the table
  <thead>
    <tr>
      <TableHeader column="orderNumber">Order Number</TableHeader>
      <TableHeader column="orderDate">Order Date</TableHeader>
      {/* ... Other columns */}
    </tr>
  </thead>
  
  

  const handleFilterChange = (column, value) => {
    setFilters({ ...filters, [column]: value });
  };

  const filteredAndSortedOrders = () => {
    let filteredOrders = orderDetails?.data ? [...orderDetails.data] : [];

    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key].toLowerCase();
      if (filterValue) {
        filteredOrders = filteredOrders.filter((order) => order[key].toLowerCase().includes(filterValue));
      }
    });

    if (sortColumn) {
      filteredOrders.sort((a, b) => {
        const aValue = a[sortColumn].toLowerCase();
        const bValue = b[sortColumn].toLowerCase();

        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
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
              <th className="py-2 px-4 border-b font-bold bg-gray-200">Order Number</th>
              <th className="py-2 px-4 border-b font-bold bg-gray-200">Order Date</th>
              <th className="py-2 px-4 border-b font-bold bg-gray-200">Entry User</th>
              <th className="py-2 px-4 border-b font-bold bg-gray-200">CSE</th>
              <th className="py-2 px-4 border-b font-bold bg-gray-200">Owner</th>
              <th className="py-2 px-4 border-b font-bold bg-gray-200">Client Name</th>
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order) => (
              <tr key={order.OrderNumber}>
                <td className="py-2 px-4 border-b text-center">{order.OrderNumber}</td>
                <td className="py-2 px-4 border-b text-center">{order.OrderDate}</td>
                <td className="py-2 px-4 border-b text-center">{order.EntryUser}</td>
                <td className="py-2 px-4 border-b text-center">{order.CSE}</td>
                <td className="py-2 px-4 border-b text-center">{order.Owner}</td>
                <td className="py-2 px-4 border-b text-center">{order.ClientName}</td>              </tr>
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
                <th className="py-2 px-4 border-b font-bold bg-gray-200">Order Number</th>
                <th className="py-2 px-4 border-b font-bold bg-gray-200">Order Date</th>
                <th className="py-2 px-4 border-b font-bold bg-gray-200">Entry User</th>
                <th className="py-2 px-4 border-b font-bold bg-gray-200">CSE</th>
                <th className="py-2 px-4 border-b font-bold bg-gray-200">Owner</th>
                <th className="py-2 px-4 border-b font-bold bg-gray-200">Client Name</th>
              </tr>
            </thead>          </table>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
