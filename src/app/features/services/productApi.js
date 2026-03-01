import { baseApi } from "../../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getallproducts
    getAllProduct: builder.query({
      query: ({ pageNumber = 0, pageSize = 12 }) =>
        `/blogs?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    getLatestBlogs: builder.query({
      query: () => `/blogs?pageNumber=0&pageSize=6`,
    }),
    getSignleProduct: builder.query({
      query: () => `/blogs?pageSize=1`,
    }),
    getBlogByUuid: builder.query({
      query: (uuid) => `/blogs/${uuid}`,
    }),
    getAllUser: builder.query({
      query: () => `/users`,
    }),
    getCommentsByBlog: builder.query({
      query: ({ blogUuid, pageNumber = 0, pageSize = 20 }) =>
        `/comments?blogUuid=${blogUuid}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: (result, error, { blogUuid }) => [
        { type: "Comment", id: blogUuid },
      ],
    }),
    
    getCurrentUser: builder.query({
      query: () => "/users/me",
    }),

    createComment: builder.mutation({
      query: ({ blogUuid, userUuid, content }) => ({
        url: "/comments",
        method: "POST",
        body: { blogUuid, userUuid, content },
      }),
      invalidatesTags: (result, error, { blogUuid }) => [
        { type: "Comment", id: blogUuid },
      ],
    }),
  }),
});

// export hook
export const {
  useGetAllProductQuery,
  useGetAllUserQuery,
  useGetSignleProductQuery,
  useGetLatestBlogsQuery,
  useGetBlogByUuidQuery,
  useGetCommentsByBlogQuery,
  useGetCurrentUserQuery,
  useCreateCommentMutation,
} = productApi;
