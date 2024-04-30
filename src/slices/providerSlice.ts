import { apiSlice } from "./apiSlice";

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
      })
    }),

    providerLogout: builder.mutation({
      query: () => ({
        url: `${PROVIDER_URL}/logout`,
        method: 'POST',
      })
    }),

    providerRegister: builder.mutation<Provider, RegisterPayload>({
      query: (data) => ({
        url: `${PROVIDER_URL}/signup`,
        method: 'POST',
        body: data,
      })
    }),

    providerVerification: builder.mutation<Provider, RegisterPayload>({
      query: (data) => ({
        url: `${PROVIDER_URL}/email-verify`,
        method: 'POST',
        body: data,
      })
    })

  })
})

export const { useProviderLoginMutation,
  useProviderRegisterMutation,
  useProviderLogoutMutation,
  useProviderVerificationMutation,

} = providerApiSlice

