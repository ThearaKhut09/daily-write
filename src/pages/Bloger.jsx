import React from "react";
import BlogCard from "../components/Card/BlogCard";

export default function Bloger() {
  return (
    <div className="bg-orange-50/30 min-h-screen p-6 md:p-12 font-sans text-gray-800 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-64 h-64 border border-orange-200 rounded-full opacity-50"></div>
      <div className="absolute -top-10 -left-10 w-64 h-64 border border-orange-200 rounded-full opacity-50"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        <aside className="w-full lg:w-1/4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden">
                <img
                  src="https://placekitten.com/200/200"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-sm">
                <span className="text-xs">✌️</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900">Ratanak kib zin</h2>
            <p className="text-gray-500 text-sm mb-6">muah@gmail.com</p>

            <div className="w-full border-t border-gray-100 pt-6 mb-6">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                Member Since
              </p>
              <p className="text-lg font-bold text-gray-700">June 2025</p>
            </div>

            <div className="w-full space-y-3">
              <button className="w-full bg-orange-500 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                PROFILE
              </button>
              <button className="w-full text-orange-500 py-3 px-4 flex items-center justify-center gap-2 font-medium hover:bg-orange-50 rounded-xl transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                ABOUT
              </button>
            </div>
          </div>
        </aside>

        <main className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-orange-500">Blogs</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Sort by:</span>
              <select className="bg-white border border-gray-200 rounded-lg px-3 py-1 outline-none focus:ring-1 focus:ring-orange-500">
                <option>Latest</option>
                <option>Popular</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            <BlogCard
              key={blog.id}
              image={blog.thumbnailUrl}
              author={author?.fullName || "Unknown Author"}
              tag={blog.blogCategory}
              title={blog.title}
              summary={blog.content}
              views={blog.view}
              time={new Date(blog.createdAt).toLocaleDateString()}
              userImage={author?.profileUrl}
              uuid={blog.uuid}
            />
          </div>

          <div className="flex justify-center items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-200 text-gray-500 hover:bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-lg bg-orange-500 text-white font-bold text-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-lg bg-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-300">
              2
            </button>
            <span className="text-gray-400">...</span>
            <button className="w-8 h-8 rounded-lg bg-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-300">
              10
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-200 text-gray-500 hover:bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </main>c
      </div>
    </div>
  );
}
