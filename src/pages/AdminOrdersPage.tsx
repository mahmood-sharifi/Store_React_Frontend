import React from 'react';
import { useGetAllOrdersQuery } from '../features/orders/orderQuery';
import Order from '../components/molecules/Order';

const AdminOrdersPage: React.FC = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuery({});

  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h2>All Orders</h2>
      {orders?.items.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};

export default AdminOrdersPage;
