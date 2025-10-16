import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import {
  getMealsByCategory,
  getMealById,
  searchMealsByName,
  getDrinksByCategory,
  getDrinkById,
  searchDrinksByName,
} from "../../services/api";

const mockFetch: Mock<
  (
    input: RequestInfo,
    init?: RequestInit | undefined
  ) => Promise<{ json: () => Promise<unknown> }>
> = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

const mockMeals = [
  { idMeal: "1", strMeal: "Chicken Soup", strMealThumb: "url" },
];
const mockMeal = { idMeal: "52772", strMeal: "Teriyaki", strMealThumb: "url" };
const mockDrinks = [{ idDrink: "1", strDrink: "Mojito", strDrinkThumb: "url" }];
const mockDrink = {
  idDrink: "11007",
  strDrink: "Margarita",
  strDrinkThumb: "url",
};

describe("API Service", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("Meals API", () => {
    it("busca meals por categoria", async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ meals: mockMeals }),
      });

      const result = await getMealsByCategory("Chicken");

      expect(global.fetch).toHaveBeenCalledWith(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"
      );
      expect(result).toEqual(mockMeals);
    });

    it("busca meal por id", async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ meals: [mockMeal] }),
      });

      const result = await getMealById("52772");

      expect(global.fetch).toHaveBeenCalledWith(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
      );
      expect(result).toEqual(mockMeal);
    });

    it("busca meals por nome", async () => {
      const localMockMeals = [
        { idMeal: "1", strMeal: "Arrabiata", strMealThumb: "url" },
      ];

      mockFetch.mockResolvedValueOnce({
        json: async () => ({ meals: localMockMeals }),
      });

      const result = await searchMealsByName("Arrabiata");

      expect(global.fetch).toHaveBeenCalledWith(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
      );
      expect(result).toEqual(localMockMeals);
    });

    it("retorna array vazio quando não há resultados", async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ meals: null }),
      });

      const result = await getMealsByCategory("Invalid");

      expect(result).toEqual([]);
    });
  });

  describe("Drinks API", () => {
    it("busca drinks por categoria", async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ drinks: mockDrinks }),
      });

      const result = await getDrinksByCategory("Cocktail");

      expect(global.fetch).toHaveBeenCalledWith(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
      );
      expect(result).toEqual(mockDrinks);
    });

    it("busca drink por id", async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ drinks: [mockDrink] }),
      });

      const result = await getDrinkById("11007");

      expect(global.fetch).toHaveBeenCalledWith(
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007"
      );
      expect(result).toEqual(mockDrink);
    });

    it("busca drinks por nome", async () => {
      const localMockDrinks = [
        { idDrink: "1", strDrink: "Mojito", strDrinkThumb: "url" },
      ];

      mockFetch.mockResolvedValueOnce({
        json: async () => ({ drinks: localMockDrinks }),
      });

      const result = await searchDrinksByName("Mojito");

      expect(global.fetch).toHaveBeenCalledWith(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Mojito"
      );
      expect(result).toEqual(localMockDrinks);
    });
  });
});
