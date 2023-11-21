const OrderTableHeader = ({ column, children, sortOrder, onSort }) => (
    <th
        className="py-2 px-4 border-b font-bold bg-gray-200 cursor-pointer"
        onClick={() => onSort(column)}
    >
        {children} {sortOrder === 'asc' ? '▲' : '▼'}
    </th>
);

export default OrderTableHeader;