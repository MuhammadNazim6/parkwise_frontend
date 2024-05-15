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
    getRequests: builder.mutation<SuccessGetResponse, void>({
      query: (data) => ({
        url: `${ADMIN_URL}/getProvidersRequests`,
        method: "GET",
        data: data,
        params: {},
        headers: {},
      }),
    }),
    getUsers: builder.mutation<SuccessGetResponse, void>({
      query: (data) => ({
        url: `${ADMIN_URL}/getUsers`,
        method: "GET",
        data: data,
        params: {},
        headers: {},
      }),
    }),
    getProviders: builder.mutation<SuccessGetResponse, void>({
      query: (data) => ({
        url: `${ADMIN_URL}/getApprovedProviders`,
        method: "GET",
        data: data,
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
} = adminApiSlice;
