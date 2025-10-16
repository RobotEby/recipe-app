import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  FavoritesProvider,
  useFavorites,
} from "../../contexts/FavoritesContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe("FavoritesContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicia com lista de favoritos vazia", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favorites).toEqual([]);
  });

  it("adiciona receita aos favoritos", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite("52772");
    });

    expect(result.current.favorites).toContain("52772");
    expect(result.current.isFavorite("52772")).toBe(true);
  });

  it("remove receita dos favoritos", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite("52772");
      result.current.toggleFavorite("52772");
    });

    expect(result.current.favorites).not.toContain("52772");
    expect(result.current.isFavorite("52772")).toBe(false);
  });

  it("persiste favoritos no localStorage", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite("52772");
      result.current.toggleFavorite("52893");
    });

    const stored = localStorage.getItem("recipeFavorites");
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)).toEqual(["52772", "52893"]);
  });

  it("carrega favoritos do localStorage ao inicializar", () => {
    localStorage.setItem("recipeFavorites", JSON.stringify(["52772", "52893"]));

    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite("52772");
    });

    expect(result.current.isFavorite("52772")).toBe(true);
    expect(result.current.isFavorite("99999")).toBe(false);
  });
});
