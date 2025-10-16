import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import Login from "../../pages/Login";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const LoginWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe("Login Page", () => {
  it("renderiza formulário de login", () => {
    const { getByPlaceholderText, getByRole } = render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    );

    expect(getByPlaceholderText("seu@email.com")).toBeInTheDocument();
    expect(getByPlaceholderText("Mínimo 6 caracteres")).toBeInTheDocument();
    expect(getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("desabilita botão com campos vazios", () => {
    const { getByRole } = render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    );

    const button = getByRole("button", { name: /entrar/i });
    expect(button).toBeDisabled();
  });

  it("habilita botão com credenciais válidas", async () => {
    const user = userEvent.setup();

    const { getByPlaceholderText, getByRole } = render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    );

    const emailInput = getByPlaceholderText("seu@email.com");
    const passwordInput = getByPlaceholderText("Mínimo 6 caracteres");
    const button = getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "teste@email.com");
    await user.type(passwordInput, "senha123");

    expect(button).not.toBeDisabled();
  });

  it("faz login e redireciona para /comidas", async () => {
    const user = userEvent.setup();

    const { getByPlaceholderText, getByRole } = render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    );

    const emailInput = getByPlaceholderText("seu@email.com");
    const passwordInput = getByPlaceholderText("Mínimo 6 caracteres");
    const button = getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "teste@email.com");
    await user.type(passwordInput, "senha123");
    await user.click(button);

    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/comidas");
    });
  });
});
