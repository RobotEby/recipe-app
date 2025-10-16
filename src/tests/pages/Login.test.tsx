import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import { AuthProvider } from "../../contexts/AuthContext";

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
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  it("renderiza formulário de login", () => {
    const { getByPlaceholderText, getByRole } = render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    );

    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Senha")).toBeInTheDocument();
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

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Senha");
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

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Senha");
    const button = getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "teste@email.com");
    await user.type(passwordInput, "senha123");
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/comidas");
  });
});
