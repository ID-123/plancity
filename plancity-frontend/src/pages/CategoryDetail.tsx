import { Link, useParams } from "react-router";
import { ErrorMessage, EventCard, Loading, ReturnButton } from "@/components";
import { useFetch } from "@/hooks";
import type { Category, Event } from "@/types";
import { useAuth } from "@/context";
import { api, ApiError } from "@/services";
import { useState } from "react";
import { useNavigate } from "react-router";

export function CategoryDetail() {
  const { id = "" } = useParams();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const category = useFetch<Category>(`/categories/${id}`);
  const events = useFetch<Event[]>(`/events?categoryId=${id}`);
  const [actionError, setActionError] = useState<ApiError | null>(null);

  const remove = async () => {
    if (!window.confirm("¿Eliminar esta categoría?")) return;
    try {
      await api.delete(`/categories/${id}`);
      navigate("/categories");
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err : new ApiError("No se pudo eliminar."),
      );
    }
  };

  if (category.loading || events.loading) return <Loading />;
  if (category.error)
    return <ErrorMessage error={category.error} onRetry={category.refetch} />;
  if (!category.data) return null;

  return (
    <>
      <ReturnButton fallback="/categories" />
      {actionError && <ErrorMessage error={actionError} />}
      <div className="page-heading">
        <div>
          <span className="eyebrow">CATEGORÍA</span>
          <h1>{category.data.name}</h1>
          <p>{category.data.description}</p>
        </div>
        {isAdmin && (
          <div className="actions">
            <Link className="button" to={`/admin/categories/${id}/edit`}>
              Editar
            </Link>
            <Link className="button" to={`/admin/events/new?categoryId=${id}`}>
              Nuevo evento
            </Link>
            <button className="button danger" onClick={remove}>
              Eliminar
            </button>
          </div>
        )}
      </div>
      {events.error && (
        <ErrorMessage error={events.error} onRetry={events.refetch} />
      )}
      <div className="grid">
        {events.data?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}
