const OrderTableHeader = ({ column, children, sortOrder, onSort }) => (
    <th className="py-2 px-4 border-b font-bold bg-gray-200 cursor-pointer">
      <button onClick={() => onSort(column)} className="focus:outline-none">
        {children} {sortOrder === 'asc' ? '▲' : '▼'}
      </button>
    </th>
  );
  
  export default OrderTableHeader;