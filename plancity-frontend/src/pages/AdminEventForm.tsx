import { useNavigate, useParams, useSearchParams } from "react-router";
import { EventForm } from "../components/EventForm";
import { useFetch } from "../hooks/useFetch";
import type { Category, Event } from "../types";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";

export function AdminEventForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const event = useFetch<Event>(`/events/${id}`, Boolean(id));
  const categories = useFetch<Category[]>("/categories");

  if ((id && event.loading) || categories.loading) return <Loading />;
  if (event.error) return <ErrorMessage error={event.error} onRetry={event.refetch} />;
  if (categories.error) {
    return <ErrorMessage error={categories.error} onRetry={categories.refetch} />;
  }

  return (
    <EventForm
      event={event.data ?? undefined}
      categories={categories.data ?? []}
      initialCategoryId={searchParams.get("categoryId") ?? undefined}
      onSaved={() => navigate("/")}
    />
  );
}
