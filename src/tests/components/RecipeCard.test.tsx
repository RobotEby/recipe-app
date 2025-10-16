import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecipeCard } from "../../components/RecipeCard";
import { FavoritesProvider } from "../../contexts/FavoritesContext";

const mockRecipe = {
  idMeal: "52772",
  strMeal: "Teriyaki Chicken Casserole",
  strMealThumb:
    "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
  strCategory: "Chicken",
};

const RecipeCardWrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe("RecipeCard", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renderiza o card com informações da receita", () => {
    const mockOnClick = vi.fn();

    const { getByText, getByAltText } = render(
      <RecipeCardWrapper>
        <RecipeCard recipe={mockRecipe} onClick={mockOnClick} />
      </RecipeCardWrapper>
    );

    expect(getByText("Teriyaki Chicken Casserole")).toBeInTheDocument();
    expect(getByText("Chicken")).toBeInTheDocument();
    expect(getByAltText("Teriyaki Chicken Casserole")).toBeInTheDocument();
  });

  it("chama onClick ao clicar no card", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    const { container } = render(
      <RecipeCardWrapper>
        <RecipeCard recipe={mockRecipe} onClick={mockOnClick} />
      </RecipeCardWrapper>
    );

    const card = container.querySelector(".cursor-pointer");
    expect(card).toBeTruthy();
    await user.click(card!);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("adiciona e remove dos favoritos", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    const { getByRole } = render(
      <RecipeCardWrapper>
        <RecipeCard recipe={mockRecipe} onClick={mockOnClick} />
      </RecipeCardWrapper>
    );

    const favoriteButton = getByRole("button", { name: "" });

    await user.click(favoriteButton);
    expect(localStorage.getItem("recipeFavorites")).toContain("52772");

    await user.click(favoriteButton);
    const stored = localStorage.getItem("recipeFavorites");
    expect(stored === null || !stored.includes("52772")).toBe(true);
  });
});
