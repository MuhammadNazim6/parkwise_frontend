import { apiSlice } from "./apiSlice";
import { onQueryStartedErrorToast } from "../../ErrorHandling/ErrorHandling";
import { ApiEndpoints } from "@/constants/apiEnums";

const USER_URL = ApiEndpoints.USER_URL

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        data: {},
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        data: data,
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    userVerification: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/send-otp`,//email-verify
        method: "POST",
        data: data,
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    userCheckOtp: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/check-otp`,
        method: "POST",
        data: data,
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    userSignGoogle: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signGoogle`,
        method: "POST",
        data: data,
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    commForgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgotPassword`,
        method: "POST",
        data: data,
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    comChangePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/changePassword`,
        method: "POST",
        data: data,
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    getParkingLots: builder.mutation({
      query: ({ coordinatesStr, services, price, limit, page }) => ({
        url: `${USER_URL}/parking-lots?price=${price}&hasAirPressureCheck=${services.airPressure}&coordinates=${coordinatesStr}&hasEvCharging=${services.evCharging}&hasWaterService=${services.waterService}&limit=${limit}&page=${page}&_=${new Date().getTime()}`,
        method: "GET",
        data: {},
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    getLotDetails: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/lot-details/${id}`,
        method: "GET",
        data: {},
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast  
    }),

    getBookedSlots: builder.mutation({
      query: ({ date, id }) => ({
        url: `${USER_URL}/getBookedSlots`,
        method: "POST",
        data: { date, lotId: id },
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    bookSlots: builder.mutation({
      query: (body) => ({
        url: `${USER_URL}/bookSlot`,
        method: "POST",
        data: body,
        params: {},
        headers: {}
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: `${USER_URL}/updateProfile`,
        method: "PATCH",
        data: body,
        params: {},
        headers: {},
        formData: true
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    fetchUserProfilePic: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/profilePicUser/${id}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    checkUserPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/checkUserPassword`,
        method: "POST",
        data: data,
        params: {},
        headers: {},
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    fetchUserBookings: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/fetchUserBookings?userId=${data.userId}&page=${data.page}`,
        method: "GET",
        data: data,
        params: {},
        headers: {},
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `${USER_URL}/cancelBooking/${bookingId}`,
        method: "PATCH",
        data: {},
        params: {},
        headers: {},
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    confirmSlotAvailability: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/confirmSlot`,
        method: "POST",
        data: data,
        params: {},
        headers: {},
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    getFilledSlots: builder.mutation({
      query: (bookingId) => ({
        url: `${USER_URL}/getFilledSlots/${bookingId}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    rescheduleSlots: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/rescheduleSlots`,
        method: "PATCH",
        data: data,
        params: {},
        headers: {},
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    getUserDetails: builder.mutation({
      query: (userId) => ({
        url: `${USER_URL}/userDetails/${userId}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),

    fetchUserBookingsCount: builder.mutation({
      query: (userId) => ({
        url: `${USER_URL}/bookingCount/${userId}`,
        method: "GET",
        data: {},
        params: {},
        headers: {},
      }),
      onQueryStarted: onQueryStartedErrorToast
    }),


  }),
});

export const {
  useRegisterMutation,
  useLogoutMutation,
  useUserVerificationMutation,
  useUserCheckOtpMutation,
  useUserSignGoogleMutation,
  useCommForgotPasswordMutation,
  useComChangePasswordMutation,
  useGetParkingLotsMutation,
  useGetLotDetailsMutation,
  useGetBookedSlotsMutation,
  useBookSlotsMutation,
  useUpdateProfileMutation,
  useFetchUserProfilePicMutation,
  useCheckUserPasswordMutation,
  useFetchUserBookingsMutation,
  useCancelBookingMutation,
  useConfirmSlotAvailabilityMutation,
  useGetFilledSlotsMutation,
  useRescheduleSlotsMutation,
  useGetUserDetailsMutation,
  useFetchUserBookingsCountMutation
} = userApiSlice;
