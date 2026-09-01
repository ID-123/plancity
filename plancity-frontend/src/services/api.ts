import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { ApiErrorBody } from "../types";

export class ApiError extends Error {
  status?: number;
  kind:
    | "network"
    | "validation"
    | "auth"
    | "forbidden"
    | "not-found"
    | "conflict"
    | "server";

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.kind =
      status === undefined
        ? "network"
        : status === 400
          ? "validation"
          : status === 401
            ? "auth"
            : status === 403
              ? "forbidden"
              : status === 404
                ? "not-found"
                : status === 409
                  ? "conflict"
                  : "server";
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("plancity_access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    if (!error.response) {
      return Promise.reject(
        new ApiError("No fue posible conectar con el servidor."),
      );
    }

    if (error.response.status === 401) {
      window.dispatchEvent(new Event("plancity:unauthorized"));
    }

    const body = error.response.data;
    const message = Array.isArray(body?.message)
      ? body.message.join(", ")
      : body?.message || "Ocurrió un error en la solicitud.";

    return Promise.reject(new ApiError(message, error.response.status));
  },
);

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await api.request<T>(config);
  return response.data;
}
