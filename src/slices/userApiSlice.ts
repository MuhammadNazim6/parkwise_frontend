import { apiSlice } from "./apiSlice";

const USER_URL = '/api/user';
interface User {
  id: number;
  name: string;
  email: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<User, RegisterPayload>({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: 'POST',
        body: data
      })
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: 'POST',
      })
    }),

    register: builder.mutation<User, RegisterPayload>({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: 'POST',
        body: data,
      })
    }),

    userVerification: builder.mutation<User, RegisterPayload>({
      query: (data) => ({
        url: `${USER_URL}/email-verify`,
        method: 'POST',
        body: data,
      })
    }),

    userCheckOtp: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/check-otp`,
        method: 'POST',
        body: data,
      })
    })

  })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useUserVerificationMutation, useUserCheckOtpMutation } = userApiSlice
