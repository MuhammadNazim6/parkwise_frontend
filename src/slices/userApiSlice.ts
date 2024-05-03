import { apiSlice } from "./apiSlice";

const USER_URL = "/api/user";
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
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
      onError: (error, variables, context) => {
        // Log the error to the console
        console.error('An error occurred during login:', error);

        // Check the error status and handle different types of errors
        if (error.status === 401) {
            // Unauthorized error handling
            console.log('Unauthorized access. Please log in again.');
        } else if (error.status === 500) {
            // Server error handling
            console.log('Internal server error. Please try again later.');
        } else {
            // Generic error handling
            alert('An error occurred. Please try again.');
        }
    },
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation<User, RegisterPayload>({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),

    userVerification: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/email-verify`,
        method: "POST",
        body: data,
      }),
    }),

    userCheckOtp: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/check-otp`,
        method: "POST",
        body: data,
      }),
    }),

    userSignGoogle: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signGoogle`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUserVerificationMutation,
  useUserCheckOtpMutation,
  useUserSignGoogleMutation
} = userApiSlice;
