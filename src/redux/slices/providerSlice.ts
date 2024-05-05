import { apiSlice } from "./apiSlice";
import { onQueryStartedErrorToast } from "../ErrorHandling/ErrorHandling";

const PROVIDER_URL = '/api/provider';
interface Provider {
  id: number;
  name: string;
  email: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const providerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    providerLogin: builder.mutation<Provider, RegisterPayload>({
      query: (data) => ({
        url: `${PROVIDER_URL}/login`,
        method: 'POST',
        body: data
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    providerLogout: builder.mutation({
      query: () => ({
        url: `${PROVIDER_URL}/logout`,
        method: 'POST',
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    providerRegister: builder.mutation<Provider, RegisterPayload>({
      query: (data) => ({
        url: `${PROVIDER_URL}/signup`,
        method: 'POST',
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    providerVerification: builder.mutation<Provider, RegisterPayload>({
      query: (data) => ({
        url: `${PROVIDER_URL}/send-otp`,//email-verify
        method: 'POST',
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    providerCheckOtp: builder.mutation({
      query: (data) => ({
        url: `${PROVIDER_URL}/check-otp`,
        method: 'POST',
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

  })
})

export const { useProviderLoginMutation,
  useProviderLogoutMutation,
  useProviderRegisterMutation,
  useProviderVerificationMutation,
  useProviderCheckOtpMutation

} = providerApiSlice

