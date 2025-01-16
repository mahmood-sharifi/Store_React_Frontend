// src/components/molecules/OrderCard.tsx
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useGetProductByIdQuery } from '../../features/products/productsQuery';

interface OrderCardProps {
  order: any;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const productIds = order.orderItems.map((item: any) => item.productId);

  const productsMap: { [key: number]: any } = {};
  productIds.forEach((productId: number) => {
    const { data: product } = useGetProductByIdQuery(productId);
    if (product) {
      productsMap[productId] = product;
    }
  });

  const totalPrice = order.orderItems.reduce((sum: number, item: any) => {
    const product = productsMap[item.productId];
    const price = product ? product.price : 0;
    return sum + price * item.quantity;
  }, 0);

  const itemsDisplay = order.orderItems
    .map((item: any) => {
      const product = productsMap[item.productId];
      return product
        ? `${product.title} (x${item.quantity})`
        : `Product ID ${item.productId} (x${item.quantity})`;
    })
    .join(', ');

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">
          Order Date: {new Date(order.orderDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">Items: {itemsDisplay}</Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Total: €{totalPrice.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
