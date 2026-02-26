import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: 'productApi', 
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    endpoints: (builder) => ({
        // getallproducts
        getAllProduct: builder.query({
            query: () => `/products`
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`
        })
    })
})

// export hook
export const {
  useGetAllProductQuery,
  useGetProductByIdQuery
} = productApi;
