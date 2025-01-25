import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the structure of the login response
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

// Define the structure for login credentials
interface LoginCredentials {
  email: string;
  password: string;
}

// Define the structure for register credentials
interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Create the API slice
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api/',prepareHeaders:(headers,{endpoint})=>{
    if (endpoint !== 'refreshToken') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    }
    return headers;
  } }),
  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: 'users/login', // Adjusted endpoint
        method: 'POST',
        body: credentials,
      }),
    }),
    // Register mutation
    register: builder.mutation<AuthResponse, RegisterCredentials>({
      query: (credentials) => ({
        url: 'users/register', // Adjusted endpoint
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => {
        const token = localStorage.getItem('refreshToken')?.toString();
        console.log("Refresh token being sent:", token);
        return {
          url: 'users/refresh-token',
          method: 'POST',
          body: { refreshToken: token },
        };
      },
    }),
  }),
});

// Export hooks for using the mutations in components
export const { useLoginMutation, useRegisterMutation ,useRefreshTokenMutation } = authApi;
