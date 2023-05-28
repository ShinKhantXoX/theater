import { configureStore } from '@reduxjs/toolkit'
import {movieSlice} from "./slice/movieSlice";
import movieReducer from './slice/movieSlice'
import movieTrailerReducer from './slice/movieTrailerSlice';
import movieDetailReducer from './slice/movieDetailSlice'
import {movieApi} from "../features/api/apiSlice";

export const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        movieReducer: movieReducer,
        movieTrailerReducer: movieTrailerReducer,
        movieDetailReducer: movieDetailReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware),
})