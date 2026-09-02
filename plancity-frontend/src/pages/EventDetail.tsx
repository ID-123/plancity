import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ErrorMessage,
  FavoriteButton,
  Loading,
  ReturnButton,
} from "@/components";
import { useFetch } from "@/hooks";
import type { Event } from "@/types";
import { useAuth } from "@/context";
import { api, ApiError } from "@/services";
import { formatEventDate, formatPrice } from "@/utils";

export function EventDetail() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const {
    data: event,
    loading,
    error,
    refetch,
  } = useFetch<Event>(`/events/${id}`);
  const [actionError, setActionError] = useState<ApiError | null>(null);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  if (!event) return null;

  const remove = async () => {
    if (!window.confirm("¿Eliminar este evento?")) return;
    try {
      await api.delete(`/events/${event.id}`);
      navigate("/");
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err : new ApiError("No se pudo eliminar."),
      );
    }
  };

  return (
    <>
      <ReturnButton />
      <article className="detail">
        {actionError && <ErrorMessage error={actionError} />}
        <div className="detail-gallery">
          {event.images?.length ? (
            event.images.map((image) => (
              <img key={image.id} src={image.url} alt={event.name} />
            ))
          ) : (
            <div className="image-placeholder large">PLAN CITY</div>
          )}
        </div>
        <div className="detail-content">
          <div className="row-between">
            <span className="tag">{event.category?.name}</span>
            <FavoriteButton eventId={event.id} />
          </div>
          <h1>{event.name}</h1>
          <p className="lead">{event.description || "Sin descripción."}</p>
          <div className="facts">
            <div>
              <span>Fecha</span>
              <strong>{formatEventDate(event.date)}</strong>
            </div>
            <div>
              <span>Lugar</span>
              <strong>{event.location}</strong>
            </div>
            <div>
              <span>Precio</span>
              <strong>{formatPrice(event.price)}</strong>
            </div>
            <div>
              <span>Cupo</span>
              <strong>{event.capacity} personas</strong>
            </div>
          </div>
          {isAdmin && (
            <div className="actions">
              <Link className="button" to={`/admin/events/${event.id}/edit`}>
                Editar
              </Link>
              <button className="button danger" onClick={remove}>
                Eliminar
              </button>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
