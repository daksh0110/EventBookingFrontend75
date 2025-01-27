import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  error: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string; user: User }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user; // Correctly set the user here
      state.isAuthenticated = true;
      state.error = null;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null; // Clear user on logout
      state.isAuthenticated = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout, loginFailure } = authSlice.actions;

export default authSlice.reducer;
