import { apiSlice } from "./apiSlice";
import { onQueryStartedErrorToast } from "../../ErrorHandling/ErrorHandling";
import { ApiEndpoints } from "@/constants/apiEnums";


interface LogoutResponse {
  status: number;
  success: boolean;
  message: string;
}
const PROVIDER_URL = ApiEndpoints.PROVIDER_URL;

export const providerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    providerLogout: builder.mutation<LogoutResponse, void>({
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
      query: (formData) => ({
        url: `${PROVIDER_URL}/sendLotForApproval`,
        method: 'POST',
        data: formData,
        params: {},
        headers: {},
        formData: true
      }),
    }),

    getProviderDetails: builder.mutation({
      query: (id) => ({
        url: `${PROVIDER_URL}/providerDetails/${id}`,
        method: 'GET',
        data: {},
        params: {},
        headers: {},
      }),
    }),

    updateProvProfileDetails: builder.mutation({
      query: (data) => ({
        url: `${PROVIDER_URL}/updateProfile/${data._id}`,
        method: 'PATCH',
        data: data,
        params: {},
        headers: {},
      }),
    }),

    fetchParkingLotsBookings: builder.mutation({
      query: ({ lotId, page }) => ({
        url: `${PROVIDER_URL}/lotsBookings?lotId=${lotId}&page=${page}`,
        method: 'GET',
        data: {},
        params: {},
        headers: {},
      }),
    }),

    checkProvPassword: builder.mutation({
      query: (data) => ({
        url: `${PROVIDER_URL}/checkProvPassword`,
        method: 'POST',
        data: data,
        params: {},
        headers: {},
      }),
    }),

    updateParkingLot: builder.mutation({
      query: (formData) => ({
        url: `${PROVIDER_URL}/updateParkingLot`,
        method: 'PATCH',
        data: formData,
        params: {},
        headers: {},
        formData: true
      }),
    }),

    fetchFeedbacks: builder.mutation({
      query: (lotId) => ({
        url: `${PROVIDER_URL}/getLotFeedbacks/${lotId}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    useFetchServicesUsedProvider: builder.mutation({
      query: (lotId) => ({
        url: `${PROVIDER_URL}/fetchServicesCount/${lotId}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    fetchMontlyBookingsProvider: builder.mutation({
      query: (lotId) => ({
        url: `${PROVIDER_URL}/fetchMonthly/${lotId}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),

    fetchWeeklyBookingsProvider: builder.mutation({
      query: (lotId) => ({
        url: `${PROVIDER_URL}/fetchWeekly/${lotId}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),

    fetchDailyBookingsProvider: builder.mutation({
      query: (lotId) => ({
        url: `${PROVIDER_URL}/fetchDaily/${lotId}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),

    fetchTotalBookingsTodayProv: builder.mutation({
      query: (lotId) => ({
        url: `${PROVIDER_URL}/fetchTodaysBookingCountProv/${lotId}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),

    getProviderProfile: builder.mutation({
      query: (lotId) => ({
        url: `${PROVIDER_URL}/provProfile/${lotId}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),
  })
})

export const {
  useProviderLogoutMutation,
  useProviderRegisterMutation,
  useProviderVerificationMutation,
  useProviderCheckOtpMutation,
  useSendParkingLotForApprovalMutation,
  useGetProviderDetailsMutation,
  useUpdateProvProfileDetailsMutation,
  useFetchParkingLotsBookingsMutation,
  useCheckProvPasswordMutation,
  useUpdateParkingLotMutation,
  useFetchFeedbacksMutation,
  useUseFetchServicesUsedProviderMutation,
  useFetchMontlyBookingsProviderMutation,
  useFetchWeeklyBookingsProviderMutation,
  useFetchDailyBookingsProviderMutation,
  useFetchTotalBookingsTodayProvMutation,
  useGetProviderProfileMutation

} = providerApiSlice

