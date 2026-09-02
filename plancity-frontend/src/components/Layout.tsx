import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export function Layout() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      setToast(message);
      window.setTimeout(() => setToast(""), 3500);
    };
    window.addEventListener("plancity:toast", handler);
    return () => window.removeEventListener("plancity:toast", handler);
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    void logout().catch(() => undefined);
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    navigate("/");
    setLoggingOut(false);
  };

  return (
    <div className="app-shell">
      <header className="header">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            P
          </span>
          <span className="brand-name">
            Plan<span>City</span>
          </span>
        </Link>
        <nav>
          <NavLink to="/">Eventos</NavLink>
          <NavLink to="/categories">Categorías</NavLink>
          {isAuthenticated && <NavLink to="/favorites">Mis favoritos</NavLink>}
          {isAdmin && <NavLink to="/admin">Administración</NavLink>}
        </nav>
        <div className="auth-actions">
          {loggingOut ? (
            <span className="navbar-status" role="status" aria-live="polite">
              <span className="spinner" aria-hidden="true" />
              Cerrando sesión...
            </span>
          ) : isAuthenticated ? (
            <>
              <span className="user-pill">
                {user?.name} · {user?.role}
              </span>
              <button
                className="button ghost"
                onClick={handleLogout}
                disabled={loggingOut}
                aria-busy={loggingOut}
              >
                {loggingOut ? "Cerrando sesión..." : "Salir"}
              </button>
            </>
          ) : (
            <>
              <Link className="button ghost" to="/login">
                Iniciar sesión
              </Link>
              <Link className="button" to="/register">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
      <footer className="footer">PlanCity · eventos locales</footer>
    </div>
  );
}
