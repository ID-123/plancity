export function Loading({ text = "Cargando..." }: { text?: string }) {
  return (
    <div className="loading" aria-live="polite">
      <span className="spinner" />
      {text}
    </div>
  );
}
