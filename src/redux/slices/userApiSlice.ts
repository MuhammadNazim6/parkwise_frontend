import { apiSlice } from "./apiSlice";
import { onQueryStartedErrorToast } from "../ErrorHandling/ErrorHandling";
import { toast } from 'react-toastify'; 

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
      onQueryStarted: onQueryStartedErrorToast
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    register: builder.mutation<User, RegisterPayload>({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    userVerification: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/send-otp`,//email-verify
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    userCheckOtp: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/check-otp`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    userSignGoogle: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signGoogle`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast
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
