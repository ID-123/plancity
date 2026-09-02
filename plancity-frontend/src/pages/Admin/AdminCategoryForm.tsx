import { useNavigate, useParams } from "react-router";
import { CategoryForm } from "@/pages/Category";
import { Loading, ReturnButton } from "@/components";
import { useFetch } from "@/hooks";
import type { Category } from "@/types";

export function AdminCategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = useFetch<Category>(`/categories/${id}`, Boolean(id));

  if (id && category.loading) return <Loading />;
  return (
    <>
      <ReturnButton fallback="/admin" />
      <CategoryForm
        category={category.data ?? undefined}
        onSaved={() => navigate("/categories")}
      />
    </>
  );
}
