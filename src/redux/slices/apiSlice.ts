import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  credentials: "include",
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({

  })
})


