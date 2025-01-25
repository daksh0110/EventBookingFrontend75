import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Response } from "../store/reducers/eventReducer";

// Define the event API
export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api/' }),
  endpoints: (builder) => ({
    fetchEvents: builder.query<Response, void>({
      query: () => 'events/get-all-events',
    }),
    fetchEventById: builder.query<Response, string>({
      query: (id) => `events/${id}`,
    }),
    
  }),
});

export const { useFetchEventsQuery,useFetchEventByIdQuery } = eventApi;