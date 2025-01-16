import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AddProductPage from './pages/AddProductPage'
import EditProductPage from './pages/EditProductPage'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminRoute from './components/molecules/AdminRoute'
import RedirectRoute from './components/molecules/RedirectRoute'
import { useDispatch } from 'react-redux'
import { useGetCurrentUserQuery } from './features/user/userQuery'
import { setToken, setProfile } from './features/auth/authSlice'
import { useSelector } from 'react-redux'
import { RootState } from './app/store'
import NavBar from './components/molecules/Navbar'
import AddCategoryPage from './pages/AddCategoryPage'
import EditCategoryPage from './pages/EditCategoryPage'
import CategoryListPage from './pages/CategoryListPage'
import UserProfilePage from './pages/UserProfilePage'
import UserOrdersPage from './pages/UserOrdersPage'
import AdminUserListPage from './pages/AdminUserListPage'
import AdminOrdersPage from './pages/AdminOrdersPage'

const App: React.FC = () => {
  const storeProfile = useSelector((state: RootState) => state.auth.profile)
  console.log(storeProfile)
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const { data: profile, isSuccess } = useGetCurrentUserQuery(undefined, {
    skip: !token
  })

  useEffect(() => {
    if (token) {
      dispatch(setToken(token))
    }
  }, [token, dispatch])
  useEffect(() => {
    if (profile) {
      dispatch(setProfile(profile))
    }
  }, [profile, dispatch])
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/orders" element={<UserOrdersPage />} />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUserListPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrdersPage />
            </AdminRoute>
          }
        />
        <Route
          path="/add-Product"
          element={
            <AdminRoute>
              <AddProductPage />
            </AdminRoute>
          }
        />
        <Route
          path="/product/:id/edit"
          element={
            <AdminRoute>
              <EditProductPage />
            </AdminRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <AdminRoute>
              <CategoryListPage />
            </AdminRoute>
          }
        />
        <Route
          path="/add-category"
          element={
            <AdminRoute>
              <AddCategoryPage />
            </AdminRoute>
          }
        />
        <Route
          path="/category/:id/edit"
          element={
            <AdminRoute>
              <EditCategoryPage />
            </AdminRoute>
          }
        />
        <Route path="/" element={<HomePage role={profile?.role || 'Guest'} />} />

        <Route path="/product/:id" element={<ProductPage role={profile?.role || 'Guest'} />} />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />

        {/* Redirect logged-in users from Login page */}
        <Route
          path="/login"
          element={
            <RedirectRoute>
              <LoginPage />
            </RedirectRoute>
          }
        />

        {/* Redirect logged-in users from Register page */}
        <Route
          path="/register"
          element={
            <RedirectRoute>
              <RegisterPage />
            </RedirectRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
