import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movieTrailer : null
};

export const movieTrailerSlice = createSlice({
    name : 'trailer',
    initialState,
    reducers: {
        getMovieTrailer : (state,action) => {
            return action.payload
        }
    }
})

export const { getMovieTrailer } = movieTrailerSlice.actions;

export default movieTrailerSlice.reducer