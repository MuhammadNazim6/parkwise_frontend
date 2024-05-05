import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  credentials: "include",
  // prepareHeaders: (headers, { getState }) => {
  //   const keys = ['userInfo', 'providerInfo', 'adminInfo'];
  //   let token = 'placeholderToken'; 

  //   keys.forEach((key) => {
  //     const infoStr = localStorage.getItem(key);
  //     if (infoStr) {
  //       const info = JSON.parse(infoStr); 
  //       if (info.token) {
  //         token = info.token; 
  //       }
  //     }
  //   });
  //   console.log(token, 'Token');
  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`)
  //   }
  //   return headers
  // },
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({

  })
})


