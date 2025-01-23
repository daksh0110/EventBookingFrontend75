import { configureStore } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';
import { eventApi } from '../services/eventApi';
import eventReducer from './reducers/eventReducer';
import { authApi } from '../services/authApi';
import authReducer from './reducers/authReducer';
import { ticketApi } from '../services/ticketApi';
export const store = configureStore({
  reducer: {
    auth:authReducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
   
    events: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware, authApi.middleware,ticketApi.middleware),
    
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();