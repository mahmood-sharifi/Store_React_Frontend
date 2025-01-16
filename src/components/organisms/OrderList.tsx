// src/components/organisms/OrderList.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import Order from '../molecules/Order';

interface OrderListProps {
  orders: any[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return <Typography>No orders found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">
        Orders
      </Typography>
      <Box mt={2} display="flex" flexDirection="column" gap={2}>
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </Box>
    </Box>
  );
};

export default OrderList;
