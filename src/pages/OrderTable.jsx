import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderTable = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortColumn, setSortColumn] = useState();
    const [sortOrder, setSortOrder] = useState('asc');
    const [filters, setFilters] = useState({
        orderNumber: '',
        orderDate: '',
        entryUser: '',
        cse: '',
        owner: '',
        clientName: '',
    });
    const [currentPage, setCurrentPage] = useState(1);

    const getOrders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getOrders', {
                params: {
                    page: currentPage,
                    perPage: 25,
                    sortColumn,
                    sortOrder,
                    ...filters,
                },
            });

            if (response.data && response.data.success) {
                setOrderDetails(response.data.data.data);
            } else {
                console.error('Invalid API response:', response.data);
                alert('Invalid API response');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching order details:', error);
            setLoading(false);
        }
    };

    const OrderTableHeader = ({ column, children, sortOrder, onSort }) => (
        <th className="py-2 px-4 border-b font-bold bg-gray-200 cursor-pointer">
          <button onClick={() => onSort(column)} className="focus:outline-none">
            {children} {sortOrder === 'asc' ? '▲' : '▼'}
          </button>
        </th>
      );

    useEffect(() => {
        getOrders();
    }, [currentPage, sortColumn, sortOrder, filters]);

    const handleSort = (column) => {
        setSortColumn(column);
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleFilterChange = (column, value) => {
        setFilters({ ...filters, [column]: value });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const displayedOrders = orderDetails || [];

    return (
        <div className="p-4">
            {loading ? (
                <p>Loading...</p>
            ) : displayedOrders.length > 0 ? (
                <div>
                    <table className="min-w-full bg-white border border-gray-300">
                    <OrderTableHeader column="orderNumber" sortOrder={sortOrder} onSort={handleSort}>
                            Order Number
                        </OrderTableHeader>
                        <OrderTableHeader column="orderDate" sortOrder={sortOrder} onSort={handleSort}>
                            Order Date
                        </OrderTableHeader>
                        <OrderTableHeader column="entryUser" sortOrder={sortOrder} onSort={handleSort}>
                            Entry User
                        </OrderTableHeader>
                        <OrderTableHeader column="cse" sortOrder={sortOrder} onSort={handleSort}>
                            CSE
                        </OrderTableHeader>
                        <OrderTableHeader column="owner" sortOrder={sortOrder} onSort={handleSort}>
                            Owner
                        </OrderTableHeader>
                        <OrderTableHeader column="clientName" sortOrder={sortOrder} onSort={handleSort}>
                            Client Name
                        </OrderTableHeader>
                        <tbody>
                            {displayedOrders.map((order) => (
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
                    <div className="pagination">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>No order details available</p>
                </div>
            )}
        </div>
    );
};

export default OrderTable;
