import React from 'react';
import { Box, IconButton, Typography, Card, CardContent } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useUpdateCartItemMutation, useDeleteCartItemMutation } from '../../features/carts/cartQuery';

interface CartItemProps {
  item: any;
  refetch: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, refetch }) => {
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const handleIncrement = async () => {
    await updateCartItem({ cartItemId: item.id, data: { quantity: item.quantity + 1 } });
    refetch();
  };

  const handleDecrement = async () => {
    if (item.quantity > 1) {
      await updateCartItem({ cartItemId: item.id, data: { quantity: item.quantity - 1 } });
      refetch();
    }
  };

  const handleDelete = async () => {
    await deleteCartItem(item.id);
    refetch();
  };

  const product = item.product;
  const totalPrice = (product.price * item.quantity).toFixed(2);

  return (
    <Card sx={{ display: 'flex', mb: 2, position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${'https://testazuredevops-euephrc9ewffdqgn.canadacentral-01.azurewebsites.net/'+product.productImage[0]?.url || '/placeholder-image.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto', zIndex: 1, backdropFilter: 'blur(4px)' }}>
        <CardContent sx={{ flex: '1 0 auto', backgroundColor: 'rgba(255, 255, 255, 0.8)', p: 2 }}>
          <Typography component="div" variant="h6">
            {product.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {product.description}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Price: €{product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total: €{totalPrice}
          </Typography>
        </CardContent>
        <Box display="flex" justifyContent="flex-start" alignItems="center" px={2} pb={2}>
          <IconButton onClick={handleDecrement}>
            <Remove />
          </IconButton>
          <Typography>{item.quantity}</Typography>
          <IconButton onClick={handleIncrement}>
            <Add />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default CartItem;
