import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderTableHeader from '../components/OrderTableHeader';
import OrderTableRow from '../components/OrderTableRow';

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

    useEffect(() => {
       getOrders();
        const fetchData = async () => {
            try {
                await getOrders();
                filteredAndSortedOrders();
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
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

    const filteredAndSortedOrders = () => {
        let filteredOrders = orderDetails != null ? [orderDetails] : [];

        // filteredOrders = filteredOrders.filter((order) =>
        //     Object.entries(filters).every(([key, value]) =>
        //         order[key] && order[key].toLowerCase().includes(value.toLowerCase())
        //     )
        // );
        // if (sortColumn) {
        //     filteredOrders.sort((a, b) => {
        //         const aValue = a[sortColumn] ? a[sortColumn].toLowerCase() : '';
        //         const bValue = b[sortColumn] ? b[sortColumn].toLowerCase() : '';
        //         return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        //     });
        // }
        return filteredOrders[0];
    };
    const displayedOrders = filteredAndSortedOrders();

    return (

        <div className="p-4">
            {loading ? (
                <p>Loading...</p>
            ) : displayedOrders && displayedOrders.length > 0 ? (
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
                                <OrderTableRow key={order.OrderNumber} order={order} />
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
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
