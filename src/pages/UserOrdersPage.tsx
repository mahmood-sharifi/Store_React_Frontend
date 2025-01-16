import React from 'react';
import { useGetAllOrdersQuery } from '../features/orders/orderQuery';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Order from '../components/molecules/Order';

const UserOrdersPage: React.FC = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const { data: orders, isLoading } = useGetAllOrdersQuery({ userId: profile?.id });

  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h2>Your Orders</h2>
      {orders?.items.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};

export default UserOrdersPage;
