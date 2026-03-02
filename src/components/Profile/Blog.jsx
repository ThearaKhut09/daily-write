import {
  useGetAllProductQuery,
  useGetAllUserQuery,
} from "../../app/features/services/productApi";
import { useGetCurrentUserQuery } from "../../app/features/auth/auth";
import BlogCard from "../Card/BlogCard";
import SkeletonCard from "../Card/Skeleton";

export default function Blog({ page = 0, pageSize = 12 }) {
  const { data: currentUserData } = useGetCurrentUserQuery();
  const currentUser = currentUserData?.data;

  const { data, isLoading, isError } = useGetAllProductQuery({
    pageNumber: page,
    pageSize: 100, // Fetch more to ensure we find user's blogs on client side
  });
  const { data: userData } = useGetAllUserQuery();

  const productData = data?.data?.content;
  const user = userData?.data?.content;

  if (isLoading || !productData) {
    return (
      <div className="flex gap-8 p-4 max-w-2xl mx-auto">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading blogs</div>;
  }

  // Filter only PUBLISHED blogs for the main blog tab that belong to current user
  const userPublishedBlogs = productData.filter(
    (blog) => blog.authorUuid === currentUser?.uuid && blog.status === "PUBLISHED"
  );

  if (userPublishedBlogs.length === 0) {
    return <div className="col-span-full py-10 text-center text-gray-500 text-lg">You haven't published any blogs yet.</div>;
  }

  return (
    <>
      {userPublishedBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          image={blog.thumbnailUrl}
          author={user?.find((u) => u.uuid === blog.authorUuid)?.fullName || currentUser?.fullName}
          tag={blog.blogCategory}
          title={blog.title}
          summary={blog.content}
          views={blog.view}
          time={new Date(blog.createdAt).toLocaleDateString()}
          userImage={
            user?.find((u) => u.uuid === blog.authorUuid)?.profileUrl || currentUser?.profileUrl
          }
        />
      ))}
    </>
  );
}
