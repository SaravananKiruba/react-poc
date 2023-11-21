const OrderTableRow = ({ order }) => (
    <tr key={order.OrderNumber}>
      <td className="py-2 px-4 border-b text-center">{order.OrderNumber}</td>
      <td className="py-2 px-4 border-b text-center">{order.OrderDate}</td>
      <td className="py-2 px-4 border-b text-center">{order.EntryUser}</td>
      <td className="py-2 px-4 border-b text-center">{order.CSE}</td>
      <td className="py-2 px-4 border-b text-center">{order.Owner}</td>
      <td className="py-2 px-4 border-b text-center">{order.ClientName}</td>
    </tr>
  );
  
  export default OrderTableRow;