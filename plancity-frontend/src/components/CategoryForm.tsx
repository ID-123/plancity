import { useEffect, useState, type FormEvent } from "react";
import type { Category, CategoryPayload } from "../types";
import { api, ApiError } from "../services/api";
import { ErrorMessage } from "./ErrorMessage";

export function CategoryForm({
  category,
  onSaved,
}: {
  category?: Category;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<CategoryPayload>({
    name: "",
    description: "",
  });
  const [error, setError] = useState<ApiError | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: category?.name ?? "",
      description: category?.description ?? "",
    });
  }, [category]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (category) await api.patch(`/categories/${category.id}`, form);
      else await api.post("/categories", form);
      onSaved();
      if (!category) setForm({ name: "", description: "" });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err
          : new ApiError("No se pudo guardar la categoría."),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form card" onSubmit={submit}>
      <h2>{category ? "Editar categoría" : "Nueva categoría"}</h2>
      {error && <ErrorMessage error={error} />}
      <label>
        Nombre
        <input
          required
          minLength={2}
          maxLength={100}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>
      <label>
        Descripción
        <textarea
          maxLength={255}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </label>
      <button className="button" disabled={saving}>
        {saving ? "Guardando..." : "Guardar categoría"}
      </button>
    </form>
  );
}
