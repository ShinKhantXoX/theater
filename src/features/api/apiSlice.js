import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
    reducerPath : 'movieApi',
    baseQuery : fetchBaseQuery({ baseUrl : 'https://api.themoviedb.org/3'}),
    tagTypes : ['movie'],
    endpoints : (builder) => ({
        getMovie : builder.query({
            query : ({cat, dayAndWeek, apiKey, page}) => `/trending/${cat}/${dayAndWeek}?api_key=${apiKey}&page=${page}`,
            providesTags : ['movie']
        }),
        getDetails : builder.query({
            query : ({cat, id, apiKey}) => `/${cat}/${id}?api_key=${apiKey}&language=en-US`,
            providesTags : ['movie']
        }),
        getSearchMovie : builder.query({
            query : ({apiKey,query}) => `/search/multi?api_key=${apiKey}&query=${query}`,
            providesTags : ['movie']
        }),
        getMovieTrailer : builder.query({
            query : ({movieId,apiKey}) => `/movie/${movieId}/videos?api_key=${apiKey}`,
            providesTags : ['movie']
        })
    })
});

export const {
    useGetMovieQuery,
    useGetDetailsQuery,
    useGetSearchMovieQuery,
    useGetMovieTrailerQuery
} = movieApi;