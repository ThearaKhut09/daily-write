import { baseApi } from "../../baseApi";

export const auth = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => "/me",
    }),
  }),
});

export const { useUserLoginMutation, useGetCurrentUserQuery } = auth;
