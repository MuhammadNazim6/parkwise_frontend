import { apiSlice } from "./apiSlice";

const ADMIN_URL = '/api/admin';
interface Admin {
  id: number;
  name: string;
  email: string;
}


export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: 'POST',
        data: data,
        params: {}, 
        headers: {}
      })
    }),
  })
})

export const { useAdminLoginMutation } = adminApiSlice

