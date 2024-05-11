import { apiSlice } from "./apiSlice";
import { onQueryStartedErrorToast } from "../ErrorHandling/ErrorHandling";

const PROVIDER_URL = '/api/provider';

export const providerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    providerLogout: builder.mutation({
      query: () => ({
        url: `${PROVIDER_URL}/logout`,
        method: 'POST',
        data: {},
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    providerRegister: builder.mutation({
      query: (data) => ({
        url: `${PROVIDER_URL}/signup`,
        method: 'POST',
        data: data,
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    providerVerification: builder.mutation({
      query: (data) => ({
        url: `${PROVIDER_URL}/send-otp`,//email-verify
        method: 'POST',
        data: data,
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    providerCheckOtp: builder.mutation({
      query: (data) => ({
        url: `${PROVIDER_URL}/check-otp`,
        method: 'POST',
        data: data,
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    sendParkingLotForApproval: builder.mutation({
      query: (data) => ({
        url: `${PROVIDER_URL}/sendLotForApproval`,
        method: 'POST',
        data: data,
        params: {},
        headers: {}
      }),
    }),
  })
})

export const {
  useProviderLogoutMutation,
  useProviderRegisterMutation,
  useProviderVerificationMutation,
  useProviderCheckOtpMutation,
  useSendParkingLotForApprovalMutation

} = providerApiSlice

