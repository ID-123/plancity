import type { ApiError } from "@/services";

export function ErrorMessage({
  error,
  onRetry,
}: {
  error: ApiError;
  onRetry?: () => void;
}) {
  const title =
    error.kind === "network"
      ? "Sin conexión"
      : error.kind === "validation"
        ? "Datos inválidos"
        : error.kind === "auth"
          ? "Sesión no válida"
          : error.kind === "forbidden"
            ? "Sin permisos"
            : error.kind === "not-found"
              ? "No encontrado"
              : error.kind === "conflict"
                ? "Conflicto"
                : "Error del servidor";

  return (
    <div className="alert error" role="alert">
      <strong>{title}</strong>
      <span>{error.message}</span>
      {onRetry && (
        <button className="button ghost" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
