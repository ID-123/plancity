import { Link } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { Category, Event } from "../types";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";
import { useAuth } from "../context/AuthContext";

export function Admin() {
  const { isAdmin } = useAuth();
  const categories = useFetch<Category[]>("/categories");
  const events = useFetch<Event[]>("/events");

  if (!isAdmin) return null;
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">ADMIN</span>
          <h1>Administración</h1>
          <p>Gestiona categorías y eventos.</p>
        </div>
      </div>
      {(categories.loading || events.loading) && <Loading />}
      {categories.error && (
        <ErrorMessage error={categories.error} onRetry={categories.refetch} />
      )}
      {events.error && (
        <ErrorMessage error={events.error} onRetry={events.refetch} />
      )}
      <div className="admin-grid">
        <section className="card admin-panel">
          <div className="row-between">
            <h2>Categorías</h2>
            <Link className="button small" to="/admin/categories/new">
              Nueva
            </Link>
          </div>
          {categories.data?.map((c) => (
            <div className="list-row" key={c.id}>
              <span>{c.name}</span>
              <Link to={`/admin/categories/${c.id}/edit`}>Editar</Link>
            </div>
          ))}
        </section>
        <section className="card admin-panel">
          <div className="row-between">
            <h2>Eventos</h2>
            <Link className="button small" to="/admin/events/new">
              Nuevo
            </Link>
          </div>
          {events.data?.map((e) => (
            <div className="list-row" key={e.id}>
              <span>{e.name}</span>
              <Link to={`/admin/events/${e.id}/edit`}>Editar</Link>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
