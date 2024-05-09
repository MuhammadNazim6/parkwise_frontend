import { apiSlice } from "./apiSlice";
import { onQueryStartedErrorToast } from "../ErrorHandling/ErrorHandling";

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
    
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        data: {},
        params: {}, 
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    register: builder.mutation<User, RegisterPayload>({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        data: data,
        params: {}, 
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    userVerification: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/send-otp`,//email-verify
        method: "POST",
        data: data,
        params: {}, 
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    userCheckOtp: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/check-otp`,
        method: "POST",
        data: data,
        params: {}, 
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    userSignGoogle: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signGoogle`,
        method: "POST",
        data: data,
        params: {}, 
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    commForgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgotPassword`,
        method: "POST",
        data: data,
        params: {}, 
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    comChangePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/changePassword`,
        method: "POST",
        data: data,
        params: {}, 
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),


  }),
});

export const {
  useRegisterMutation,
  useLogoutMutation,
  useUserVerificationMutation,
  useUserCheckOtpMutation,
  useUserSignGoogleMutation,
  useCommForgotPasswordMutation,
  useComChangePasswordMutation,
} = userApiSlice;
