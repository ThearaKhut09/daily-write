import { useGetAllProductQuery, useGetAllUserQuery } from "../../app/features/services/productApi";
import BlogCard from "../Card/BlogCard";
import SkeletonCard from "../Card/Skeleton";

export default function Blog({ page = 0, pageSize = 12 }) {
  const { data, isLoading, isError } = useGetAllProductQuery({ pageNumber: page, pageSize });
  const { data: userData } = useGetAllUserQuery();

  const productData = data?.data?.content;
  const totalPages = data?.data?.totalPages || 0;
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

  return (
    <>
      {productData.map((blog) => (
        <BlogCard
          key={blog.id}
          image={blog.thumbnailUrl}
          author={user?.find((u) => u.uuid === blog.authorUuid)?.fullName}
          tag={blog.blogCategory}
          title={blog.title}
          summary={blog.content}
          views={blog.view}
          time={new Date(blog.createdAt).toLocaleDateString()}
          userImage={user?.find((u) => u.uuid === blog.authorUuid)?.profileUrl}
        />
      ))}
    </>
  );
}
