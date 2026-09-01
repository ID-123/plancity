import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api, ApiError } from "../services/api";
import { useAuth } from "./AuthContext";
import type { Event } from "../types";

interface FavoritesContextValue {
  favoriteIds: Set<string>;
  loading: boolean;
  refreshFavorites: () => Promise<void>;
  toggleFavorite: (eventId: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const refreshFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavoriteIds(new Set());
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get<Event[]>("/favorites");
      setFavoriteIds(new Set(data.map((event) => event.id)));
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshFavorites().catch(() => {
      setFavoriteIds(new Set());
    });
  }, [refreshFavorites]);

  const toggleFavorite = useCallback(
    async (eventId: string) => {
      if (!isAuthenticated) return;

      const currentlyFavorite = favoriteIds.has(eventId);

      try {
        if (currentlyFavorite) {
          await api.delete(`/favorites/${eventId}`);
          setFavoriteIds((current) => {
            const next = new Set(current);
            next.delete(eventId);
            return next;
          });
        } else {
          await api.post(`/favorites/${eventId}`);
          setFavoriteIds((current) => new Set(current).add(eventId));
        }
      } catch (error) {
        const apiError =
          error instanceof ApiError
            ? error
            : new ApiError("No se pudo actualizar favoritos.");

        if (apiError.status === 409) {
          setFavoriteIds((current) => new Set(current).add(eventId));
          return;
        }

        if (apiError.status === 404) {
          setFavoriteIds((current) => {
            const next = new Set(current);
            next.delete(eventId);
            return next;
          });
          return;
        }

        throw apiError;
      }
    },
    [favoriteIds, isAuthenticated],
  );

  const value = useMemo(
    () => ({ favoriteIds, loading, refreshFavorites, toggleFavorite }),
    [favoriteIds, loading, refreshFavorites, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe utilizarse dentro de FavoritesProvider");
  }
  return context;
}
