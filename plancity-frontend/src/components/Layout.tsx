import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export function Layout() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState("");

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
    await logout();
    navigate("/");
  };

  return (
    <div className="app-shell">
      <header className="header">
        <Link to="/" className="brand">
          Plan<span>City</span>
        </Link>
        <nav>
          <NavLink to="/">Eventos</NavLink>
          <NavLink to="/categories">Categorías</NavLink>
          {isAuthenticated && <NavLink to="/favorites">Mis favoritos</NavLink>}
          {isAdmin && <NavLink to="/admin">Administración</NavLink>}
        </nav>
        <div className="auth-actions">
          {isAuthenticated ? (
            <>
              <span className="user-pill">
                {user?.name} · {user?.role}
              </span>
              <button className="button ghost" onClick={handleLogout}>
                Salir
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
