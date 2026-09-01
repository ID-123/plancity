import { useNavigate, useParams } from "react-router";
import { CategoryForm } from "../components/CategoryForm";
import { useFetch } from "../hooks/useFetch";
import type { Category } from "../types";
import { Loading } from "../components/Loading";

export function AdminCategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = useFetch<Category>(`/categories/${id}`, Boolean(id));

  if (id && category.loading) return <Loading />;
  return (
    <CategoryForm
      category={category.data ?? undefined}
      onSaved={() => navigate("/categories")}
    />
  );
}
