import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Auth } from "@/pages/Auth/Auth";
import { AuthProvider } from "@/context/AuthContext";
import type { ReactNode } from "react";

const login = vi.fn().mockResolvedValue(undefined);
const register = vi.fn().mockResolvedValue(undefined);

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ login, register }),
  AuthProvider: ({ children }: { children: ReactNode }) => children,
}));

describe("Login integration", () => {
  beforeEach(() => login.mockClear());

  it("submits controlled login form", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AuthProvider>
          <Auth mode="login" />
        </AuthProvider>
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Correo"), "user@example.com");
    await user.type(screen.getByLabelText("Contraseña"), "secret123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(login).toHaveBeenCalledWith("user@example.com", "secret123");
  });
});
