import { Link, useLocation } from "react-router";
import styles from "./Footer.module.css";

export function Footer() {
  const { pathname } = useLocation();

  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <footer className={`footer ${styles.footer}`}>
      <Link className={styles.brand} to="/" aria-label="PlanCity, ir al inicio">
        Plan<span>City</span>
      </Link>
      <span className={styles.caption}>Eventos locales</span>
    </footer>
  );
}
