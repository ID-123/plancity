import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { Loading } from "@/components/Loading";

export function ProtectedRoute({ adminOnly = false }: { adminOnly?: boolean }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading text="Validando sesión..." />;
  if (!isAuthenticated)
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(`${location.pathname}${location.search}`)}`}
        replace
      />
    );
  if (adminOnly && !isAdmin) return <Navigate to="/forbidden" replace />;

  return <Outlet />;
}
