import { describe, it, expect, beforeEach } from "vitest";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import { renderHook, act } from "@testing-library/react";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicia com usuário não autenticado", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("faz login com credenciais inválidas", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const success = result.current.login("test@email.com", "senha123");
      expect(success).toBe(true);
    });

    expect(result.current.user).toEqual({
      email: "teste@email.com",
      name: "teste",
    });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("falha login com credenciais inválidas", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const success = result.current.login("emailinvalido", "123");
      expect(success).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("persiste usuário no localStorage", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login("teste@email.com", "senha123");
    });

    const stored = localStorage.getItem("recipeAppUser");
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)).toEqual({
      email: "teste@email.com",
      name: "teste",
    });
  });

  it("faz logout corretamente", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login("teste@email.com", "senha123");
    });

    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem("recipeAppUser")).toBeNull();
  });

  it("carrega usuário ao localStorage ao inicializar", () => {
    const user = { email: "teste@email.com", name: "teste" };
    localStorage.setItem("recipeAppUser", JSON.stringify(user));

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toEqual(user);
    expect(result.current.isAuthenticated).toBe(true);
  });
});
