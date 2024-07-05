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


export const apiSlice = createApi({
  baseQuery:axiosBaseQuery({
    baseUrl:import.meta.env.VITE_BACKEND_BASEURL,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({

  })
})


