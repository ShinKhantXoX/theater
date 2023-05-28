import { createSlice } from '@reduxjs/toolkit';
import {act} from "react-dom/test-utils";

const initialState = {
    fetchMovie : {}
};

export const movieSlice = createSlice({
    name : 'movie',
    initialState,
    reducers: {
        getMovie : (state,action) => {
            return action.payload
        }
    }
})

export const { getMovie } = movieSlice.actions;

export default movieSlice.reducer