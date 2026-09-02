import { useFetch } from "../hooks/useFetch";
import type { Event } from "../types";
import { EventCard } from "../components/EventCard";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";
import { ReturnButton } from "../components/ReturnButton";

export function Favorites() {
  const { data, loading, error, refetch } = useFetch<Event[]>("/favorites");
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  return (
    <>
      <ReturnButton />
      <div className="page-heading">
        <div>
          <span className="eyebrow">TU COLECCIÓN</span>
          <h1>Mis favoritos</h1>
        </div>
      </div>
      {data?.length ? (
        <div className="grid">
          {data.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onFavoriteChange={refetch}
            />
          ))}
        </div>
      ) : (
        <div className="empty">Todavía no tienes eventos favoritos.</div>
      )}
    </>
  );
}
