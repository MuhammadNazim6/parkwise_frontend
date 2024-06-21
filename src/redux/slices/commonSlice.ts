import { apiSlice } from "./apiSlice";
import { onQueryStartedErrorToast } from "../../ErrorHandling/ErrorHandling";
import { ApiEndpoints } from "@/constants/apiEnums";


const COMMON_URL = ApiEndpoints.COMMON_URL;


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

    fetchConnections: builder.mutation({
      query: (id) => ({
        url: `${COMMON_URL}/getConnections/${id}`,
        method: 'GET',
        data: {},
        params: {},
        headers: {},
      }),
    }),

    fetchMessages: builder.mutation({
      query: (data) => ({
        url: `${COMMON_URL}/getMessages?senderId=${data.senderId}&receiverId=${data.recieverId}`,
        method: 'GET',
        data: {},
        params: {},
        headers: {},
      }),
    }),
    
    sendSaveMessage: builder.mutation({
      query: (data) => ({
        url: `${COMMON_URL}/saveMessage`,
        method: 'POST',
        data: data,
        params: {},
        headers: {},
      }),
    }),

    getSenderName: builder.mutation({
      query: (id) => ({
        url: `${COMMON_URL}/getSender/${id}`,
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
  useFetchBookingDetailsMutation,
  useFetchConnectionsMutation,
  useFetchMessagesMutation,
  useSendSaveMessageMutation,
  useGetSenderNameMutation
} = commonApiSLice
