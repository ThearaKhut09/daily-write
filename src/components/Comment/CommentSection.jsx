import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useCreateCommentMutation,
  useGetCommentsByBlogQuery,
  useGetCurrentUserQuery,
} from "../../app/features/services/productApi";

export default function CommentSection({ blogUuid }) {
  const hasToken = Boolean(localStorage.getItem("accessToken"));
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: currentUserResponse } = useGetCurrentUserQuery(undefined, {
    skip: !hasToken,
  });

  const currentUser = currentUserResponse?.data;

  const {
    data: commentsResponse,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useGetCommentsByBlogQuery(
    { blogUuid, pageNumber: 0, pageSize: 20 },
    { skip: !blogUuid },
  );

  const [createComment, { isLoading: creatingComment }] =
    useCreateCommentMutation();

  const comments = commentsResponse?.data?.content || [];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!hasToken || !currentUser?.uuid) {
      setErrorMessage("Please login first to comment.");
      return;
    }

    const trimmed = content.trim();
    if (!trimmed) {
      setErrorMessage("Comment cannot be empty.");
      return;
    }

    try {
      await createComment({
        blogUuid,
        userUuid: currentUser.uuid,
        content: trimmed,
      }).unwrap();
      setContent("");
    } catch (error) {
      const message =
        error?.data?.message ||
        error?.data?.error ||
        "Failed to post comment. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <section className="mt-10">
      <h3 className="text-2xl font-semibold text-[#9f430a]">Comments</h3>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={
            hasToken ? "Write your comment..." : "Login to write a comment"
          }
          disabled={!hasToken || creatingComment}
          className="w-full rounded-xl border border-border-main bg-bg-main p-3 text-sm text-text-main outline-none focus:border-primary-orange"
          rows={4}
        />

        {errorMessage && (
          <p className="text-sm font-medium text-red-600">{errorMessage}</p>
        )}

        {!hasToken && (
          <p className="text-sm text-text-main">
            Please{" "}
            <Link to="/auth" className="text-primary-orange font-semibold">
              login
            </Link>{" "}
            to post a comment.
          </p>
        )}

        <button
          type="submit"
          disabled={!hasToken || creatingComment}
          className="rounded-lg bg-primary-orange px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {creatingComment ? "Posting..." : "Post comment"}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {commentsLoading && (
          <p className="text-sm text-text-main">Loading comments...</p>
        )}

        {commentsError && (
          <p className="text-sm text-red-600">Failed to load comments.</p>
        )}

        {!commentsLoading && !commentsError && comments.length === 0 && (
          <p className="text-sm text-text-main">No comments yet.</p>
        )}

        {comments.map((item) => {
          const commentedDate = item?.commentedDate
            ? new Date(item.commentedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "";

          return (
            <article
              key={item.uuid}
              className="rounded-xl border border-border-main bg-white p-4"
            >
              <div className="flex items-center gap-2">
                {item?.user?.profileUrl ? (
                  <img
                    src={item.user.profileUrl}
                    alt={item?.user?.fullName || "User"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-orange text-white flex items-center justify-center text-xs font-semibold uppercase">
                    {(item?.user?.fullName || "U").charAt(0)}
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-text-main">
                    {item?.user?.fullName || "Unknown User"}
                  </p>
                  {commentedDate && (
                    <p className="text-xs text-[#797f84]">{commentedDate}</p>
                  )}
                </div>
              </div>

              <p className="mt-3 text-sm text-text-main">{item.content}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
