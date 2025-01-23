import { createSlice } from '@reduxjs/toolkit';
import { eventApi } from '../../services/eventApi';


interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  createdBy: string;
  updatedAt: string;
  seats: Seat[];
}
export interface Seat {
  id: string;
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
        state.events = action.payload; // Directly assigning the array of events
      })
      .addMatcher(eventApi.endpoints.fetchEvents.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default eventSlice.reducer;


