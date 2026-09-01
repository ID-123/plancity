export function formatEventDate(value: string) {
  return new Date(value).toLocaleString("es-CO", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

export function formatEventDateShort(value: string) {
  return new Date(value).toLocaleDateString("es-CO", {
    dateStyle: "medium",
  });
}

export function formatPrice(value: number) {
  if (value === 0) return "Gratis";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}
