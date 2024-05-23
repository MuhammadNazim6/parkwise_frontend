import { apiSlice } from "./apiSlice";
import { onQueryStartedErrorToast } from "../ErrorHandling/ErrorHandling";

const USER_URL = "/api/user";

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
  useGetBookedSlotsMutation
} = userApiSlice;
