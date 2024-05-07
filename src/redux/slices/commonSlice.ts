import { apiSlice } from "./apiSlice";
import { onQueryStartedErrorToast } from "../ErrorHandling/ErrorHandling";


const COMMON_URL = '/api/common';


export const commonApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    comResendOtp: builder.mutation({
      query: (data) => ({
        url: `${COMMON_URL}/resend-otp`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),
  })
})

export const { useComResendOtpMutation } = commonApiSLice
