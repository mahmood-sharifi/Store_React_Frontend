import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { logout } from '../../features/auth/authSlice'
import CartDrawer from '../organisms/CartDrawer'
import { openCart, closeCart } from '../../features/carts/cartSlice'

const NavBar: React.FC = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state: RootState) => state.auth.profile)
  const token = useSelector((state: RootState) => state.auth.token)

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout())
  }

  const handleCartOpen = () => {
    dispatch(openCart())
  }

  // Close the cart drawer
  const handleCartClose = () => {
    dispatch(closeCart())
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#333' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          My E-Commerce
        </Typography>
        <Box>
          {/* If user is logged in */}
          {token ? (
            <>
              {/* If admin, show Admin Dashboard link */}
              {profile?.role === 'Admin' && (
                <Button color="inherit" component={Link} to="/admin-dashboard">
                  Admin Dashboard
                </Button>
              )}
              {profile?.role === 'Admin' && (
                <Button color="inherit" component={Link} to="/add-Product">
                  Add Product
                </Button>
              )}
              {profile?.role === 'Admin' && (
                <Button color="inherit" component={Link} to="/categories">
                  Categories
                </Button>
              )}
              {profile?.role === 'Admin' && (
                <Button color="inherit" component={Link} to="/categories">
                  Categories
                </Button>
              )}
              {profile?.role === 'Admin' && (
                <Button color="inherit" component={Link} to="/admin/users">
                  Users List
                </Button>
              )}
              {profile?.role === 'Admin' && (
                <Button color="inherit" component={Link} to="/admin/orders">
                  Orders List
                </Button>
              )}
              {profile?.role === 'User' && (
                  <Button color="inherit" component={Link} to="/orders">
                    My Orders
                  </Button>
              )}
              {profile?.role === 'User' && (
                  <Button color="inherit" component={Link} to="/profile">
                    Profile
                  </Button>
              )}
              {profile?.role === 'User' && (
                <IconButton color="inherit" onClick={handleCartOpen}>
                  <Badge badgeContent={0} color="secondary">
                    Cart
                  </Badge>
                </IconButton>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Sign In
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
      <CartDrawer />
    </AppBar>
  )
}

export default NavBar
