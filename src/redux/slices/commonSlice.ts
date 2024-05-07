import { apiSlice } from "./apiSlice";
import { onQueryStartedErrorToast } from "../ErrorHandling/ErrorHandling";


const COMMON_URL = '/api/common';


export const commonApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    commonLogin: builder.mutation({
      query: (data) => ({
        url: `${COMMON_URL}/login`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),
    commonResendOtp: builder.mutation({
      query: (data) => ({
        url: `${COMMON_URL}/resend-otp`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),
  })
})

export const { useCommonResendOtpMutation, useCommonLoginMutation } = commonApiSLice
