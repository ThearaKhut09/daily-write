import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog-api.bykh.org/api/v100" }),
  endpoints: (builder) => ({
    // getallproducts
    getAllProduct: builder.query({
      query: ({ pageNumber = 0, pageSize = 12 }) => `/blogs?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    getLatestBlogs: builder.query({
      query: () => `/blogs?pageNumber=0&pageSize=6`,
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
export const { useGetAllProductQuery, useGetAllUserQuery , useGetSignleProductQuery, useGetLatestBlogsQuery} = productApi;
