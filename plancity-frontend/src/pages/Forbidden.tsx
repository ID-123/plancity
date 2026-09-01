import { Link } from "react-router";

export function Forbidden() {
  return (
    <div className="empty">
      <h1>403</h1>
      <h2>Sin permisos</h2>
      <p>Tu usuario no tiene permisos de administrador.</p>
      <Link className="button" to="/">
        Volver a eventos
      </Link>
    </div>
  );
}
