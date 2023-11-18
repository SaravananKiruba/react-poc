import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderTable = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //GetOrderdeatilsbyorderNo(7485);
    getlatest100Records();
    //GetOrderDetails();
  }, []);

  const getlatest100Records = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getlatest100Records');
      setOrderDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setLoading(false);
    }
  };
  const GetOrderDetails = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getorderdetails');
      setOrderDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setLoading(false);
    }
  };
  const GetOrderdeatilsbyorderNo = async (orderNumber) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/order-details/${orderNumber}`);
      setOrderDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setLoading(false);
    }
  };


  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : orderDetails && orderDetails.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b font-bold bg-gray-200">Order Number</th>
              <th class="py-2 px-4 border-b font-bold bg-gray-200">Order Date</th>
              <th class="py-2 px-4 border-b font-bold bg-gray-200">Entry User</th>
              <th class="py-2 px-4 border-b font-bold bg-gray-200">CSE</th>
              <th class="py-2 px-4 border-b font-bold bg-gray-200">Owner</th>
              <th class="py-2 px-4 border-b font-bold bg-gray-200">Client Name</th>
            </tr>
          </thead>

          <tbody>
            {orderDetails.map((order) => (
              <tr key={order.OrderNumber}>
                <td className="py-2 px-4 border-b text-center">{order.OrderNumber}</td>
                <td className="py-2 px-4 border-b text-center">{order.OrderDate}</td>
                <td className="py-2 px-4 border-b text-center">{order.EntryUser}</td>
                <td className="py-2 px-4 border-b text-center">{order.CSE}</td>
                <td className="py-2 px-4 border-b text-center">{order.Owner}</td>
                <td className="py-2 px-4 border-b text-center">{order.ClientName}</td>
              </tr>
            ))}
          </tbody>

        </table>
      ) : (
        <p>No order details available</p>
      )}

    </div>
  );


};

export default OrderTable;

