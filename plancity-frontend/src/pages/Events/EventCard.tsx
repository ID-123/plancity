import { Link } from "react-router";
import type { Event } from "@/types";
import { FavoriteButton } from "@/pages/Favorites/FavoriteButton";
import { formatEventDateShort, formatPrice } from "@/utils";

interface Props {
  event: Event;
  onFavoriteChange?: () => void;
}

export function EventCard({ event, onFavoriteChange }: Props) {
  const image = [...(event.images ?? [])].sort((a, b) => a.order - b.order)[0]
    ?.url;

  return (
    <article className="card event-card">
      <Link to={`/events/${event.id}`} className="image-wrap">
        {image ? (
          <img src={image} alt={event.name} />
        ) : (
          <div className="image-placeholder">PLAN CITY</div>
        )}
      </Link>
      <div className="card-body">
        <div className="row-between">
          <span className="tag">{event.category?.name ?? "Evento"}</span>
          <FavoriteButton eventId={event.id} onChange={onFavoriteChange} />
        </div>
        <h3>{event.name}</h3>
        <p className="muted">{formatEventDateShort(event.date)}</p>
        <p className="muted">{event.location}</p>
        <div className="row-between">
          <strong>{formatPrice(event.price)}</strong>
          <Link className="button small" to={`/events/${event.id}`}>
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
