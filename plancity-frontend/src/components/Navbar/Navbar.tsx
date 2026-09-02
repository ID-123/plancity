import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import styles from "./Navbar.module.css";

export function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loggingOut, setLoggingOut] = useState(false);

  if (pathname === "/login" || pathname === "/register") return null;

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    void logout().catch(() => undefined);
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    navigate("/");
    setLoggingOut(false);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <span className={styles.brandMark} aria-hidden="true">
          P
        </span>
        <span className={styles.brandName}>
          Plan<span>City</span>
        </span>
      </Link>
      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
          to="/"
        >
          Eventos
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
          to="/categories"
        >
          Categorías
        </NavLink>
        {isAuthenticated && (
          <NavLink
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            to="/favorites"
          >
            Mis favoritos
          </NavLink>
        )}
        {isAdmin && (
          <NavLink
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            to="/admin"
          >
            Administración
          </NavLink>
        )}
      </nav>
      <div className={styles.authActions}>
        {loggingOut ? (
          <span
            className={styles.navbarStatus}
            role="status"
            aria-live="polite"
          >
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
  );
}
