import { createBrowserRouter, Navigate } from "react-router";
import { Layout, ProtectedRoute } from "@/components";
import { Home, EventDetail } from "@/pages/Events";
import { Categories, CategoryDetail } from "@/pages/Category";
import { Auth } from "@/pages/Auth";
import { Favorites } from "@/pages/Favorites";
import { Admin, AdminCategoryForm, AdminEventForm } from "@/pages/Admin";
import { Forbidden } from "@/components/Forbidden";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "events/:id", element: <EventDetail /> },
      { path: "categories", element: <Categories /> },
      { path: "categories/:id", element: <CategoryDetail /> },
      { path: "login", element: <Auth mode="login" /> },
      { path: "register", element: <Auth mode="register" /> },
      { path: "forbidden", element: <Forbidden /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "favorites", element: <Favorites /> }],
      },
      {
        element: <ProtectedRoute adminOnly />,
        children: [
          { path: "admin", element: <Admin /> },
          { path: "admin/categories/new", element: <AdminCategoryForm /> },
          {
            path: "admin/categories/:id/edit",
            element: <AdminCategoryForm />,
          },
          { path: "admin/events/new", element: <AdminEventForm /> },
          { path: "admin/events/:id/edit", element: <AdminEventForm /> },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
