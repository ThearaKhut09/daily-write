import { useEffect, useState } from "react";
import BlogCard from "../Card/BlogCard";

export default function ListBlog() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function fetchBlogs() {
      const response = await fetch(
        "https://blog-api.bykh.org/api/v100/blogs?pageNumber=0&pageSize=12",
      );
      const data = await response.json();
      setBlogs(data.data.content);
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    async function getUser() {
      const response = await fetch("https://blog-api.bykh.org/api/v100/users");
      const result = await response.json();
      setUser(result.data.content);
    }
    getUser();
  }, []);
  return (
    <>
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          image={blog.thumbnailUrl}
          author={user.find((u) => u.uuid === blog.authorUuid)?.fullName }
          tag={blog.blogCategory}
          title={blog.title}
          summary={blog.content}
          views={blog.view}
          time={new Date(blog.createdAt).toLocaleDateString()}
          userImage={user.find((u) => u.uuid === blog.authorUuid)?.profileUrl }
        />
      ))}
    </>
  );
}
