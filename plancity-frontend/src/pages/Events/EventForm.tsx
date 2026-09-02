import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router";
import type { Category, Event, EventPayload } from "@/types";
import { api, ApiError } from "@/services";
import { ErrorMessage } from "@/components/ErrorMessage";

const initial: EventPayload = {
  name: "",
  description: "",
  date: "",
  location: "",
  price: 0,
  capacity: 1,
  categoryId: "",
  images: [],
};

function toInputDate(date?: string) {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventForm({
  event,
  categories,
  onSaved,
  initialCategoryId,
}: {
  event?: Event;
  categories: Category[];
  onSaved: () => void;
  initialCategoryId?: string;
}) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<EventPayload>(initial);
  const [imageText, setImageText] = useState("");
  const [error, setError] = useState<ApiError | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (event) {
      setForm({
        name: event.name,
        description: event.description ?? "",
        date: toInputDate(event.date),
        location: event.location,
        price: event.price,
        capacity: event.capacity,
        categoryId: event.categoryId,
        images: [...(event.images ?? [])]
          .sort((a, b) => a.order - b.order)
          .map((image) => image.url),
      });
      setImageText(event.images?.map((image) => image.url).join("\n") ?? "");
    } else {
      setForm({
        ...initial,
        categoryId: initialCategoryId ?? searchParams.get("categoryId") ?? "",
      });
      setImageText("");
    }
  }, [event]);

  const update = <K extends keyof EventPayload>(
    key: K,
    value: EventPayload[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      date: new Date(form.date).toISOString(),
      price: Number(form.price),
      capacity: Number(form.capacity),
      images: imageText
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean),
    };
    try {
      if (event) await api.patch(`/events/${event.id}`, payload);
      else await api.post("/events", payload);
      onSaved();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err
          : new ApiError("No se pudo guardar el evento."),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form card wide-form" onSubmit={submit}>
      <h2>{event ? "Editar evento" : "Crear evento"}</h2>
      {error && <ErrorMessage error={error} />}
      <div className="form-grid">
        <label>
          Nombre
          <input
            required
            minLength={2}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </label>
        <label>
          Categoría
          <select
            required
            value={form.categoryId}
            onChange={(e) => update("categoryId", e.target.value)}
          >
            <option value="">Selecciona...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Fecha y hora
          <input
            required
            type="datetime-local"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </label>
        <label>
          Lugar
          <input
            required
            minLength={2}
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </label>
        <label>
          Precio
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
          />
        </label>
        <label>
          Cupo
          <input
            required
            type="number"
            min="1"
            value={form.capacity}
            onChange={(e) => update("capacity", Number(e.target.value))}
          />
        </label>
      </div>
      <label>
        Descripción
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </label>
      <label>
        URLs de imágenes{" "}
        <span className="muted">(una por línea, máximo 10)</span>
        <textarea
          value={imageText}
          onChange={(e) => setImageText(e.target.value)}
          placeholder="https://..."
        />
      </label>
      <button className="button" disabled={saving}>
        {saving ? "Guardando..." : "Guardar evento"}
      </button>
    </form>
  );
}
