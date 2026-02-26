import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog-api.bykh.org/api/v100" }),
  endpoints: (builder) => ({
    // getallproducts
    getAllProduct: builder.query({
      query: () => `/blogs?pageSize=6`,
    }),
    getSignleProduct: builder.query({
      query: () => `/blogs?pageSize=1`,
    }),
    getAllUser: builder.query({
      query: () => `/users`,
    }),
  }),
});

// export hook
export const { useGetAllProductQuery, useGetAllUserQuery , useGetSignleProductQuery} = productApi;
