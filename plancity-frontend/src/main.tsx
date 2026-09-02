import { StrictMode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RouterProvider } from "react-router/dom";
import { createRoot } from "react-dom/client";
import { router } from "@/router/router";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
