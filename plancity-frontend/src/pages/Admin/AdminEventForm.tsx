import { useNavigate, useParams, useSearchParams } from "react-router";
import { EventForm } from "@/pages/Events/EventForm";
import { ErrorMessage, Loading, ReturnButton } from "@/components";
import { useFetch } from "@/hooks";
import type { Category, Event } from "@/types";

export function AdminEventForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const event = useFetch<Event>(`/events/${id}`, Boolean(id));
  const categories = useFetch<Category[]>("/categories");

  if ((id && event.loading) || categories.loading) return <Loading />;
  if (event.error)
    return <ErrorMessage error={event.error} onRetry={event.refetch} />;
  if (categories.error) {
    return (
      <ErrorMessage error={categories.error} onRetry={categories.refetch} />
    );
  }

  return (
    <>
      <ReturnButton fallback="/admin" />
      <EventForm
        event={event.data ?? undefined}
        categories={categories.data ?? []}
        initialCategoryId={searchParams.get("categoryId") ?? undefined}
        onSaved={() => navigate("/")}
      />
    </>
  );
}
