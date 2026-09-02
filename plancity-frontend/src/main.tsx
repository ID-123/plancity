import { StrictMode } from "react";
import { AuthProvider, FavoritesProvider } from "@/context";
import { ErrorBoundary } from "@/components";
import { RouterProvider } from "react-router/dom";
import { router } from "@/router/router";
import "./styles.css";
import { createRoot } from "react-dom/client";

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
