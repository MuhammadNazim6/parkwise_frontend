import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";
interface Admin {
  id: number;
  name: string;
  email: string;
}
interface SuccessGetResponse {
  data: {}[]
}

interface LogoutResponse {
  status: number;
  success: boolean;
  message: string;
}

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        data: data,
        params: {},
        headers: {},
      }),
    }),
    adminLogout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
        data: {},
        params: {},
        headers: {},
      }),
    }),
    getRequests: builder.mutation({
      query: (page) => ({
        url: `${ADMIN_URL}/getProvidersRequests?page=${page}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),
    getUsers: builder.mutation({
      query: (page) => ({
        url: `${ADMIN_URL}/getUsers?page=${page}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),
    getProviders: builder.mutation({
      query: (page) => ({
        url: `${ADMIN_URL}/getApprovedProviders?page=${page}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),
    blockUnblockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/blockUnblockUser`,
        method: "PATCH",
        data: data,
        params: {},
        headers: {},
      }),
    }),
    blockUnblockProvider: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/blockUnblockProvider`,
        method: "PATCH",
        data: data,
        params: {},
        headers: {},
      }),
    }),
    acceptReq: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/acceptReq`,
        method: "PATCH",
        data: data,
        params: {},
        headers: {},
      }),
    }),
    rejectReq: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/rejectReq`,
        method: "PATCH",
        data: data,
        params: {},
        headers: {},
      }),
    }),
    fetchServicesUsedCountAdmin: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/fetchServicesCount`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),

    fetchTotalBookingsTodayAdmin: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/fetchTotalBookingsToday`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),
    fetchMontlyBookingsAdmin: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/fetchMonthlyAdmin`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),

    fetchWeeklyBookingsAdmin: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/fetchWeekly`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),

    fetchDailyyBookingsAdmin: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/fetchDaily`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),

    fetchAppSuggestions: builder.mutation({
      query: (page) => ({
        url: `${ADMIN_URL}/getSuggestions?page=${page}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
    }),


  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useGetRequestsMutation,
  useGetUsersMutation,
  useGetProvidersMutation,
  useBlockUnblockProviderMutation,
  useBlockUnblockUserMutation,
  useAcceptReqMutation,
  useRejectReqMutation,
  useFetchServicesUsedCountAdminMutation,
  useFetchMontlyBookingsAdminMutation,
  useFetchWeeklyBookingsAdminMutation,
  useFetchDailyyBookingsAdminMutation,
  useFetchTotalBookingsTodayAdminMutation,
  useFetchAppSuggestionsMutation

} = adminApiSlice;
