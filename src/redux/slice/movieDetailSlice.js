import { createSlice } from '@reduxjs/toolkit';
import {act} from "react-dom/test-utils";

const initialState = {
    detailMovie : {}
};

export const movieDetailSlice = createSlice({
    name : 'detail',
    initialState,
    reducers: {
        getMovieDetail : (state,action) => {
            return action.payload
        }
    }
})

export const { getMovieDetail } = movieDetailSlice.actions;

export default movieDetailSlice.reducer