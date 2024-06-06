import { apiSlice } from "./apiSlice";
import { onQueryStartedErrorToast } from "../ErrorHandling/ErrorHandling";


const COMMON_URL = '/api/common';


export const commonApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    commonLogin: builder.mutation({
      query: (data) => ({
        url: `${COMMON_URL}/login`,
        method: "POST",
        data: data,
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),
    commonResendOtp: builder.mutation({
      query: (data) => ({
        url: `${COMMON_URL}/resend-otp`,
        method: "POST",
        data: data,
        params: {},
        headers: {}

      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    fetchBookingDetails: builder.mutation({
      query: (id) => ({
        url: `${COMMON_URL}/bookingDetails/${id}`,
        method: 'GET',
        data: {},
        params: {},
        headers: {},
      }),
    }),

  })
})

export const {
  useCommonResendOtpMutation,
  useCommonLoginMutation,
  useFetchBookingDetailsMutation
} = commonApiSLice
