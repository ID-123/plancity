import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { ApiError } from "../services/api";

export function FavoriteButton({
  eventId,
  onChange,
}: {
  eventId: string;
  onChange?: () => void;
}) {
  const { isAuthenticated } = useAuth();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const isFavorite = favoriteIds.has(eventId);

  const toggle = async () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(`/events/${eventId}`)}`);
      return;
    }

    setBusy(true);
    try {
      await toggleFavorite(eventId);
      onChange?.();
    } catch (error) {
      const apiError =
        error instanceof ApiError
          ? error
          : new ApiError("No se pudo actualizar favoritos.");
      window.dispatchEvent(
        new CustomEvent("plancity:toast", { detail: apiError.message }),
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      className={`favorite ${isFavorite ? "active" : ""}`}
      onClick={toggle}
      disabled={busy}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
