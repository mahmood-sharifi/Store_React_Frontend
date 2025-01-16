import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  id: number;
}

interface AuthState {
  token: string | null;
  profile: UserProfile | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),  // Initialize from localStorage
  profile: null,  // Initial profile is null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);  // Save token to localStorage
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;  // Save profile to Redux store
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;  // Clear the profile on logout
      localStorage.removeItem('token');  // Remove token from localStorage
    },
  },
});

export const { setToken, setProfile, logout } = authSlice.actions;

export default authSlice.reducer;
