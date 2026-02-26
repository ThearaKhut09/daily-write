import { Card, CardSidBar } from "../../Card/HomepageCard";
import SkeletonCard, { Skeleton } from "../../Card/Skeleton";
import {
  useGetAllProductQuery,
  useGetAllUserQuery,
  useGetSignleProductQuery,
} from "../../../app/features/services/productApi";

export default function ListCard() {
  const { data, isLoading, isError } = useGetSignleProductQuery();
  const { data: userData } = useGetAllUserQuery();

  if (isLoading || isError) return <SkeletonCard />;

  const productData = data?.data?.content;
  const user = userData?.data?.content;
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
          view={item.view}
        />
      ))}
    </>
  );
}

export function SideBar() {
  const { data, isLoading, isError } = useGetAllProductQuery();
  const { data: userData } = useGetAllUserQuery();

  const productData = data?.data?.content;
  const user = userData?.data?.content;

  if (!productData || productData.length === 0 || isError || isLoading) {
    return (
      <div className="flex flex-col gap-8 p-4 max-w-2xl mx-auto">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i}/>
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
