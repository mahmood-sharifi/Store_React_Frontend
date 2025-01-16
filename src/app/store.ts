import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authQuery';
import { userApi } from '../features/user/userQuery';
import { categoryApi } from '../features/categories/categoryQuery';
import { productsApi } from '../features/products/productsQuery';
import { orderApi } from '../features/orders/orderQuery';
import { cartApi } from '../features/carts/cartQuery';
import cartReducer from '../features/carts/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(userApi.middleware)
      .concat(categoryApi.middleware)
      .concat(orderApi.middleware)
      .concat(cartApi.middleware)
      .concat(authApi.middleware)
      .concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
