import { Card, CardSidBar } from "../../Card/HomepageCard";
import SkeletonCard, { Skeleton } from "../../Card/Skeleton";
import { useGetAllProductQuery, useGetAllUserQuery, useGetSignleProductQuery } from "../../../app/features/services/productApi";

export default function ListCard() {

  const { data, isLoading, isError } = useGetSignleProductQuery();
  const { data: userData } = useGetAllUserQuery();

  if (isLoading) return <SkeletonCard />;
  if (isError) return <SkeletonCard />;

  const productData = data?.content || data?.data?.content || [];
  const user = userData?.content || userData?.data?.content || [];
  return (
    <>
      {productData?.map((item) => (
        <Card
          key={item.uuid}
          title={item.title}
          description={item.content}
          image={item.thumbnailUrl}
          user={
            user.find((u) => u.uuid === item.authorUuid)?.fullName ||
            item.authorUuid
          }
          userImage={
            user.find((u) => u.uuid === item.authorUuid)?.profileUrl || null
          }
        />
      ))}
    </>
  );
}

export function SideBar() {
  const { data, isLoading, isError } = useGetAllProductQuery();
  const { data: userData } = useGetAllUserQuery();

  if (isLoading) return <SkeletonCard />;
  if (isError) return <SkeletonCard/>;

  const productData = data?.content || data?.data?.content || [];
  const user = userData?.content || userData?.data?.content || [];

if (productData.length === 0 || isError) {
  return (
    <div className="flex flex-col gap-8 p-4 max-w-2xl mx-auto">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-4 items-start animate-pulse">
          
          {/* Left Side: Text Content */}
          <div className="flex-1 space-y-3">
            {/* Category Skeleton */}
            <div className="h-4 w-20 bg-gray-200 rounded" />
            
            {/* Title Skeletons (2 lines) */}
            <div className="space-y-2">
              <div className="h-5 w-full bg-gray-200 rounded" />
              <div className="h-5 w-2/3 bg-gray-200 rounded" />
            </div>
            
            {/* Footer Metadata (Date and User) */}
            <div className="flex items-center gap-4 mt-4">
              <div className="h-3 w-16 bg-gray-100 rounded" />
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full" />
                <div className="h-3 w-12 bg-gray-100 rounded" />
              </div>
            </div>
          </div>

          {/* Right Side: Image Skeleton (Matches your w-28 h-20) */}
          <div className="w-28 h-20 bg-gray-200 rounded-xl shrink-0" />
          
        </div>
      ))}
    </div>
  );
}
  return (
    <div className="space-y-8">
      {productData.map((item) => (
        <CardSidBar
          key={item.uuid}
          title={item.title}
          image={item.thumbnailUrl}
          blogCategory={item.blogCategory}
          view={item.view}
          createdAt={new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          user={
            user.find((u) => u.uuid === item.authorUuid)?.fullName ||
            item.authorUuid
          }
          userImage={
            user.find((u) => u.uuid === item.authorUuid)?.profileUrl || null
          }
        />
      ))}
    </div>
  );
}
