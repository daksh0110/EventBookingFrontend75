import { createSlice } from '@reduxjs/toolkit';
import { eventApi } from '../../services/eventApi';


export interface Response {
  data: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: Response = {
 data: [] ,
  loading: false,
  error: null,
};
export interface Event {
  
  _id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  createdBy: string;
  updatedAt: string;
  seats: Seat[];
}
export interface Seat {

  name: string;
  price: number;
  booked: boolean;
}
// Create the event slice
const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(eventApi.endpoints.fetchEvents.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(eventApi.endpoints.fetchEvents.matchFulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // Directly assigning the array of events
      })
      .addMatcher(eventApi.endpoints.fetchEvents.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default eventSlice.reducer;


