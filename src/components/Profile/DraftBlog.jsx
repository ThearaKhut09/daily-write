import {
  useGetAllProductQuery,
  useGetAllUserQuery,
} from "../../app/features/services/productApi";
import { useGetCurrentUserQuery } from "../../app/features/auth/auth";
import BlogCard from "../Card/BlogCard";
import SkeletonCard from "../Card/Skeleton";

export default function DraftBlog({ page = 0, pageSize = 12 }) {
  const { data: currentUserData } = useGetCurrentUserQuery();
  const currentUser = currentUserData?.data;

  const { data, isLoading, isError } = useGetAllProductQuery({
    pageNumber: page,
    pageSize: 100, // Fetch more to find drafts on client side
  });
  const { data: userData } = useGetAllUserQuery();

  const productData = data?.data?.content;
  const user = userData?.data?.content;

  if (isLoading || !productData) {
    return (
      <div className="contents">
        {[...Array(pageSize)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading drafts</div>;
  }

  // Filter only DRAFT blogs for the drafts tab that belong to current user
  const userDraftBlogs = productData.filter(
    (blog) => blog.authorUuid === currentUser?.uuid && blog.status === "DRAFT"
  );

  if (userDraftBlogs.length === 0) {
    return (
      <div className="col-span-full py-10 text-center text-gray-500 text-lg">
        No draft blogs found.
      </div>
    );
  }

  return (
    <>
      {userDraftBlogs.map((blog) => {
        const author = user?.find((u) => u.uuid === blog.authorUuid);
        return (
          <BlogCard
            key={blog.id}
            image={blog.thumbnailUrl}
            author={author?.fullName || currentUser?.fullName}
            tag={blog.blogCategory}
            title={blog.title}
            summary={blog.content}
            views={blog.view}
            time={new Date(blog.createdAt).toLocaleDateString()}
            userImage={author?.profileUrl || currentUser?.profileUrl}
          />
        );
      })}
    </>
  );
}
