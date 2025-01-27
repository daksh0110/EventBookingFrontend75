
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Ticket {
    id:string,
    eventId:string,
    userId:string,
    seatNumber:string,
    price:number,
    status:string,
    createdAt:string,
    updatedAt:string,
}

interface TicketResponse {
    data:Ticket,
    success:boolean,
}
export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api/' }),
    endpoints: (builder) => ({
        createTicket: builder.mutation<TicketResponse, { id: string; seatNumber: string }>({
            query: ({ id, seatNumber }) => {
                const token = localStorage.getItem('accessToken'); // Get the token from local storage
                return {
                    url: `events/book-event/${id}`,
                    method: 'POST',
                    body: { seatNumber },
                    headers: {
                        Authorization: `Bearer ${token}`, // Set the Authorization header
                    },
                };
            },
        }),
    }),
});
export const { useCreateTicketMutation } = ticketApi;