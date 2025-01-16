import React, { useEffect } from 'react'
import { Drawer, Box, Typography, List, ListItem, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { closeCart } from '../../features/carts/cartSlice'
import { useGetAllCartItemsQuery } from '../../features/carts/cartQuery'
import { useCreateOrderMutation } from '../../features/orders/orderQuery'
import CartItem from '../molecules/CartItem'

const CartDrawer: React.FC = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state: RootState) => state.cart.isOpen)
  const storeProfile = useSelector((state: RootState) => state.auth.profile)
  const userId = storeProfile?.id || 0
  const { data: cartItems, refetch } = useGetAllCartItemsQuery({ userId })
  const [createOrder] = useCreateOrderMutation()

  useEffect(() => {
    if (isOpen) {
      refetch()
    }
  }, [isOpen])

  const handleClose = () => {
    dispatch(closeCart())
  }

  const handlePlaceOrder = async () => {
    try {
      await createOrder({ userId })
      refetch()
      dispatch(closeCart())

      alert('Order placed successfully')
    } catch (error) {
      alert('Failed to place order')
    }
  }

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      <Box width={400} p={2}>
        <Typography variant="h6">Cart</Typography>
        <List>
          {cartItems?.items.map((item) => (
            <ListItem key={item.id}>
              <CartItem item={item} refetch={refetch} />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" onClick={handlePlaceOrder} fullWidth>
          Place Order
        </Button>
      </Box>
    </Drawer>
  )
}

export default CartDrawer
