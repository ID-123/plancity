import { ErrorMessage, Loading, ReturnButton } from "@/components";
import { EventCard } from "@/pages/Events/EventCard";
import { useFetch } from "@/hooks";
import type { Event } from "@/types";

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
