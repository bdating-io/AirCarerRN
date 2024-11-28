import { WeeklyRoutine } from "@app/types/timeSlot.type";
import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';

interface AirCarerState {
    lang: string;
    access_token: string | null;
    fontSize: number;
    myRoutine: WeeklyRoutine;
    registration: any;
}

const initialState: AirCarerState = {
    access_token: null,
    lang: 'en',
    fontSize: 20,
    myRoutine: {},
    registration: {}
}

export const aircarerSlice = createSlice({
    name: 'aircarer',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload;
            SecureStore.setItemAsync('lang', action.payload);
        },
        setFontSize: (state, action) => {
            state.fontSize = action.payload;
            SecureStore.setItemAsync('fontSize', action.payload);
        },
        setMyRoutine: (state, action) => {
            state.myRoutine = action.payload;
        },
        setRegistration: (state, action) => {
            state.registration = action.payload;
        },
        setAccessToken: (state, action) => {
            state.access_token = action.payload;
        }
    }
});

export const { reducer } = aircarerSlice;