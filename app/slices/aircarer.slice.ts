import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';

interface AirCarerState {
    logged_user: any;
    lang: string;
    fontSize: number;
}

const initialState: AirCarerState = {
    logged_user: null,
    lang: 'en',
    fontSize: 20
}

export const aircarerSlice = createSlice({
    name: 'aircarer',
    initialState,
    reducers: {
        setLoggedUser: (state, action) => {
            state.logged_user = action.payload;
        },
        setLang: (state, action) => {
            state.lang = action.payload;
            SecureStore.setItemAsync('lang', action.payload);
        },
        setFontSize: (state, action) => {
            state.fontSize = action.payload;
            SecureStore.setItemAsync('fontSize', action.payload);
        }
    }
});

export const { reducer } = aircarerSlice;