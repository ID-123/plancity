import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ErrorMessage, Loading } from "@/components";
import { EventCard } from "@/pages/Events";
import { useFetch, useDebouncedValue } from "@/hooks";
import type { Category, Event } from "@/types";
import { useAuth } from "@/context";

export function Home() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { isAdmin } = useAuth();
  const debouncedSearch = useDebouncedValue(search, 300);
  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }
    if (categoryId) params.set("categoryId", categoryId);
    return `/events${params.toString() ? `?${params}` : ""}`;
  }, [debouncedSearch, categoryId]);

  const events = useFetch<Event[]>(query);
  const categories = useFetch<Category[]>("/categories");

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">DESCUBRE · ORGANIZA · DISFRUTA</span>
          <h1>Encuentra tu próximo plan.</h1>
          <p>
            Conciertos, talleres, deportes y actividades locales en un solo
            lugar.
          </p>
        </div>
        <div className="actions">
          <Link to="/categories" className="button">
            Explorar categorías
          </Link>
          {isAdmin && (
            <Link to="/admin/events/new" className="button">
              Crear evento
            </Link>
          )}
        </div>
      </section>

      <section className="toolbar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar eventos..."
          aria-label="Buscar eventos"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          {categories.data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </section>

      {events.loading && <Loading />}
      {events.error && (
        <ErrorMessage error={events.error} onRetry={events.refetch} />
      )}
      {!events.loading &&
        events.data &&
        (events.data.length ? (
          <div className="grid">
            {events.data.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="empty">No encontramos eventos con esos filtros.</div>
        ))}
    </>
  );
}
