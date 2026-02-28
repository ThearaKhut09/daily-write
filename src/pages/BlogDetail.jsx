import { useEffect } from "react";
import { Bookmark, Clock3, Eye, Heart, Link2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import {
  useGetBlogByUuidQuery,
  useGetAllUserQuery,
  useGetLatestBlogsQuery,
} from "../app/features/services/productApi";
import CommentSection from "../components/Comment/CommentSection";

export default function BlogDetail() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [uuid]);

  const {
    data: blogResult,
    isLoading: blogLoading,
    isError: blogError,
  } = useGetBlogByUuidQuery(uuid, { skip: !uuid });

  console.log("blogResult:", blogResult);
  console.log("uuid:", uuid);
  console.log("blogLoading:", blogLoading);
  console.log("blogError:", blogError);

  const { data: usersResult, error: usersError } = useGetAllUserQuery();
  const { data: latestResult, error: latestError } = useGetLatestBlogsQuery();
  console.log("usersResult:", usersResult, "usersError:", usersError);
  console.log("latestResult:", latestResult, "latestError:", latestError);

  // Handle both direct blog return and wrapped response
  const blog = blogResult?.data || blogResult;
  const users = usersResult?.data?.content || usersResult || [];
  const latest = latestResult?.data?.content || latestResult || [];

  const author = blog
    ? users.find((u) => u.uuid === blog.authorUuid) || null
    : null;
  const latestBlogs = blog
    ? latest.filter((item) => item.uuid !== blog.uuid).slice(0, 4)
    : [];

  const loading = blogLoading;
  const error = blogError ? "Failed to load blog detail." : "";

  if (loading) {
    return (
      <section className="bg-bg-main px-4 py-6 text-text-main sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl text-center text-lg">
          Loading blog...
        </div>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="bg-bg-main px-4 py-6 text-text-main sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-lg text-red-500">{error || "Blog not found."}</p>
          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="mt-4 rounded-lg bg-primary-orange px-4 py-2 text-white"
          >
            Back to Blogs
          </button>
        </div>
      </section>
    );
  }

  const createdDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="bg-bg-main px-4 py-3 text-text-main sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={blog.thumbnailUrl}
            alt={blog.title}
            className="h-55 w-full object-cover sm:h-80 md:h-105"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-primary-orange px-3 py-1.5 text-sm text-white sm:text-base">
            {blog.blogCategory}
          </span>
        </div>

        <div className="mx-auto mt-6 max-w-5xl">
          <h1 className="text-3xl font-bold text-primary-orange sm:text-4xl">
            {blog.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#30393e]">
            <div className="flex items-center gap-2">
              <img
                src={author?.profileUrl}
                alt={author?.fullName || "Author"}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <p className="font-medium leading-none">
                  {author?.fullName || "Unknown Author"}
                </p>
                <p className="mt-1 text-xs text-[#797f84]">{createdDate}</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs sm:text-sm">
              <Clock3 size={14} /> 10 min read
            </span>
            <span className="flex items-center gap-1 text-xs sm:text-sm">
              <Eye size={14} /> {blog.view} views
            </span>
          </div>

          <article className="prose prose-sm mt-8 max-w-none text-text-main sm:prose-base">
            {parse(blog.content || "")}
          </article>

          <div className="mt-8 border-t border-border-main pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 rounded-xl border border-[#a5aaae] px-4 py-2 text-sm hover:bg-gray-50">
                <Heart size={16} /> 20
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-[#a5aaae] px-4 py-2 text-sm hover:bg-gray-50">
                <Bookmark size={16} /> 20
              </button>
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
                className="flex items-center gap-2 rounded-xl border border-[#a5aaae] px-4 py-2 text-sm hover:bg-gray-50"
              >
                <Link2 size={16} /> Copy link
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-[#9f430a]">
              Latest in This Topic
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {latestBlogs.map((item) => (
                <article
                  key={item.uuid}
                  onClick={() => navigate(`/blogs/${item.uuid}`)}
                  className="flex min-h-32 cursor-pointer overflow-hidden rounded-2xl border border-[#797f84] bg-bg-main"
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="h-full w-32 shrink-0 object-cover sm:w-40"
                  />
                  <div className="flex flex-1 flex-col justify-center p-3">
                    <h4 className="text-sm font-semibold text-black sm:text-base">
                      {item.title}
                    </h4>
                    <p className="mt-1 line-clamp-3 text-xs text-black/80 sm:text-sm">
                      {(item.content || "")
                        .replace(/<[^>]+>/g, " ")
                        .replace(/\s+/g, " ")
                        .trim()}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <CommentSection blogUuid={blog.uuid} />

          <div className="mt-5 border-t border-border-main" />
        </div>
      </div>
    </section>
  );
}