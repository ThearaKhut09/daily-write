import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.jsx";
import BlogList from "./pages/BlogList.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Auth from "./pages/Auth.jsx";
import Auth1 from"./pages/Auth1.jsx";
import Profile from "./pages/Profile.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import SaveBlog from "./pages/SaveBlog.jsx";
import Layout from "./layout.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blogs",
        element: <BlogList />,
      },
      {
        path: "/blog-post",
        element: <BlogPost />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/blog-detail",
        element: <BlogDetail />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/auth1",
    element: <Auth1 />,
  },
  {
    path: "/save-blog",
    element: <SaveBlog />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
