import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../services/api";
import { ErrorMessage } from "../components/ErrorMessage";

export function Auth({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isRegister) await register(name, email, password);
      else await login(email, password);
      navigate(redirect);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err
          : new ApiError("No se pudo completar la operación."),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="form card auth-card" onSubmit={submit}>
        <span className="eyebrow">
          {isRegister ? "CREA TU CUENTA" : "BIENVENIDO"}
        </span>
        <h1>{isRegister ? "Regístrate" : "Inicia sesión"}</h1>
        {error && <ErrorMessage error={error} />}
        {isRegister && (
          <label>
            Nombre
            <input
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        )}
        <label>
          Correo
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Contraseña
          <input
            required
            minLength={6}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="button" disabled={loading}>
          {loading ? "Procesando..." : isRegister ? "Crear cuenta" : "Entrar"}
        </button>
        <p className="muted">
          {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <Link to={isRegister ? "/login" : "/register"}>
            {isRegister ? "Inicia sesión" : "Regístrate"}
          </Link>
        </p>
      </form>
    </div>
  );
}
import React from "react";
