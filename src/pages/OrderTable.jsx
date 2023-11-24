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

    const handleDownloadPDF = async (orderNumber) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/generate-pdf/${orderNumber}`, {
                responseType: 'arraybuffer',
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `Order_${orderNumber}_Invoice.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setLoading(false);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            alert('Error downloading PDF');
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

    const handleRowClick = (orderNumber) => {
        handleDownloadPDF(orderNumber);
    };

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
            <div className="flex mb-4 space-x-16">
                {['orderNumber', 'orderDate', 'entryUser', 'cse', 'owner', 'clientName'].map((column) => (
                    <input
                        key={column}
                        type="text"
                        placeholder={column.charAt(0).toUpperCase() + column.slice(1)}
                        value={filters[column]}
                        onChange={(e) => handleFilterChange(column, e.target.value)}
                        className="border p-2"
                    />
                ))}
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : displayedOrders.length > 0 ? (
                <div>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                {['orderNumber', 'orderDate', 'entryUser', 'cse', 'owner', 'clientName'].map((column) => (
                                    <OrderTableHeader
                                        key={column}
                                        column={column}
                                        sortOrder={sortOrder}
                                        onSort={handleSort}
                                    >
                                        {column.charAt(0).toUpperCase() + column.slice(1)}
                                    </OrderTableHeader>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {displayedOrders.map((order) => (
                                <tr key={order.OrderNumber} onClick={() => handleRowClick(order.OrderNumber)}>
                                    {['OrderNumber', 'OrderDate', 'EntryUser', 'CSE', 'Owner', 'ClientName'].map(
                                        (field) => (
                                            <td key={field} className="py-2 px-4 border-b text-center">
                                                {field === 'OrderNumber' ? (
                                                    <button onClick={() => handleDownloadPDF(order.OrderNumber)}>
                                                        {order[field]}
                                                    </button>
                                                ) : (
                                                    order[field]
                                                )}
                                            </td>
                                        )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Previous
                        </button>
                        <span>Page {currentPage}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={displayedOrders.length < 25} // Adjust based on actual page size
                        >
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
