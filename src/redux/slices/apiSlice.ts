import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../axiosInstance";
import type { RootState } from "../store";

const axiosBaseQuery = 
({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }


// use this if normal
// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://localhost:3000',
//   credentials: "include",
// })


export const apiSlice = createApi({
  baseQuery:axiosBaseQuery({
    // baseUrl:'http://localhost:3000',
    baseUrl:'https://thriftkicks.store/',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({

  })
})


