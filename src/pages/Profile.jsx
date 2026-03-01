import React, { useState } from "react";
import {
  User,
  Info,
  Bookmark,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Bookmark as BookmarkIcon,
} from "lucide-react";
import { useGetCurrentUserQuery } from "../app/features/auth/auth";
import { getDecryptedRefreshToken, clearTokens } from "../util/tokenUtil";
import { useNavigate } from "react-router-dom";
import { useGetAllProductQuery } from "../app/features/services/productApi";
import ListBlog from "../components/BlogPage/ListBlog";

const BlogCard = ({
  category,
  title,
  description,
  time,
  likes,
  saves,
  image,
  tagColor,
  authorName,
  authorImage,
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
    {/* Card Header */}
    <div className="p-3 flex items-center gap-2">
      <img
        src={
          authorImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"
        }
        alt="avatar"
        className="w-6 h-6 rounded-full border border-gray-200 object-cover"
      />
      <span className="text-xs font-medium text-gray-700">{authorName}</span>
    </div>

    {/* Image Container */}
    <div className="relative h-40 w-full bg-gray-200">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <span
        className={`absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded text-white font-medium ${tagColor}`}
      >
        {category}
      </span>
    </div>

    {/* Content */}
    <div className="p-4 flex-1">
      <h3 className="font-bold text-sm leading-tight mb-2 text-gray-800">
        {title}
      </h3>
      <p className="text-xs text-gray-500 line-clamp-2 mb-4">{description}</p>

      <div className="mt-auto">
        <span className="text-[10px] text-gray-400 block mb-3">{time}</span>
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-gray-400">
            <div className="flex items-center gap-1">
              <Heart size={14} className="text-orange-500 fill-orange-500" />
              <span className="text-[10px] font-bold text-gray-600">
                {likes}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BookmarkIcon
                size={14}
                className="text-orange-500 fill-orange-500"
              />
              <span className="text-[10px] font-bold text-gray-600">
                {saves}
              </span>
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold py-1.5 px-4 rounded-lg transition-colors">
            Read More
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const token = getDecryptedRefreshToken();
  const [page, setPage] = useState(0);
  const pageSize = 12;

  const { data } = useGetAllProductQuery({ pageNumber: page, pageSize });
  const totalPages = data?.data?.totalPages || 0;

  const {
    data: userData,
    isLoading,
    isError,
  } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  const user = userData?.data;

  React.useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    clearTokens();
    navigate("/");
    window.location.reload();
  };

  if (!token) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFCFB]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const getPageNumbers = () => {
    const pages = [];
    const total = totalPages;

    if (total <= 7) {
      for (let i = 0; i < total; i++) {
        pages.push(i);
      }
    } else {
      if (page < 4) {
        for (let i = 0; i < 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(total - 1);
      } else if (page > total - 5) {
        pages.push(0);
        pages.push("...");
        for (let i = total - 5; i < total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(0);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(total - 1);
      }
    }
    return pages;
  };

  return (
    <div className="flex min-h-screen bg-[#FDFCFB]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-100 flex flex-col p-6 fixed h-full bg-white">
        <div
          className="flex items-center gap-2 mb-12 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <span className="text-orange-600 text-xl">🖋️</span>
          </div>
          <h1 className="font-bold text-xl text-gray-800">DailyWrite</h1>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-500 text-white font-medium shadow-md shadow-orange-200">
            <User size={18} /> Profile
          </button>
          <button
            onClick={() => navigate("/about")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-orange-400 hover:bg-orange-50 font-medium transition-all"
          >
            <Info size={18} /> About
          </button>
          <button
            onClick={() => navigate("/save-blog")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-orange-400 hover:bg-orange-50 font-medium transition-all"
          >
            <Bookmark size={18} /> Saved
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <header className="flex justify-between items-start mb-12">
          <div className="flex flex-col items-center mx-auto">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden bg-gray-100 flex items-center justify-center">
                {user?.profileUrl ? (
                  <img
                    src={user.profileUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-gray-400" />
                )}
              </div>
              <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=1"
                  className="w-5 h-5"
                  alt="badge"
                />
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {user?.fullName || "User"}
            </h2>
            <p className="text-gray-400 text-sm">
              {user?.email || "email@example.com"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-700 transition-colors"
          >
            Log Out
          </button>
        </header>

        {/* Blogs Feed */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center mb-8 relative">
            <h2 className="text-4xl font-black text-orange-500 tracking-tight">
              Blogs
            </h2>
            <div className="absolute right-0 flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <button className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1 bg-white text-gray-700">
                Latest <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Card blog */}
            <ListBlog page={page} pageSize={pageSize} />
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-md border border-border-main px-2 py-1 text-[#a5aaae] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {getPageNumbers().map((pageNum, idx) =>
              pageNum === "..." ? (
                <span key={idx} className="px-2 text-[#a5aaae]">
                  ...
                </span>
              ) : (
                <button
                  key={idx}
                  onClick={() => setPage(pageNum)}
                  className={`rounded-md px-3 py-1 ${
                    page === pageNum
                      ? "bg-primary-orange text-white"
                      : "border border-border-main text-[#5e6569] hover:bg-gray-100"
                  }`}
                >
                  {pageNum + 1}
                </button>
              ),
            )}
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1}
              className="rounded-md border border-border-main px-2 py-1 text-[#a5aaae] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
