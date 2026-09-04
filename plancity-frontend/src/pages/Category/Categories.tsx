import { Link } from "react-router";
import { ErrorMessage, Loading } from "@/components";
import { useFetch } from "@/hooks";
import type { Category } from "@/types";
import { useAuth } from "@/context";

export function Categories() {
  const { data, loading, error, refetch } = useFetch<Category[]>("/categories");
  const { isAdmin } = useAuth();

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">EXPLORA</span>
          <h1>Categorías</h1>
        </div>
        {isAdmin && (
          <Link className="button" to="/admin/categories/new">
            Nueva categoría
          </Link>
        )}
      </div>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} onRetry={refetch} />}
      <div className="category-grid">
        {data?.map((category) => (
          <Link
            className="category-card"
            to={`/categories/${category.id}`}
            key={category.id}
          >
            <span>✦</span>
            <h2>{category.name}</h2>
            <p>
              {category.description || "Explora eventos de esta categoría."}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
