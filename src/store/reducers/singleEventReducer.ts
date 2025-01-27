import { createSlice } from "@reduxjs/toolkit";



export interface SingleEvent {
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
        _id: string;
    number: number;
    price: number;
    isAvailable: boolean;
    }


    export interface Response {
    data: SingleEvent;
    loading: boolean;
    error: string | null;
    }
    const initialState: Response = {
        data: {
          _id: "",
          name: "",
          description: "",
          date: "",
          location: "",
          createdBy: "",
          updatedAt: "",
          seats: [], // An empty array as no seats are available initially
        },
        loading: false,
        error: null,
      };
    // Create the event slice
    const singleEventSlice = createSlice({
    name: "singleEvent",
    initialState,
    reducers: {},
   
    });
    export default singleEventSlice.reducer;

