import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TAG_LOGIN } from '../../../apiTages';
import { API_ENDPOINT_LOGIN, BASE_URL } from '../../../apiTypes';
import { header } from '../../../header';


export const LOGIN_API = createApi({
    reducerPath: "LOGIN_API",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => { return header(headers) },
        timeout: 5000,
    }),
    tagTypes: [TAG_LOGIN],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => ({
                url: API_ENDPOINT_LOGIN,
                method: 'POST',
                body: payload,
            }),
            // providesTags: [TAG_LOGIN],
        }),
    })
})
export const { useLoginMutation } = LOGIN_API;