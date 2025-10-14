import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { RecipeCard } from "../../components/RecipeCard";
import { FavoritesProvider } from "../../contexts/FavoritesContext";
import { userInfo } from "os";
import userEvent from "@testing-library/user-event";

const mockRecipe = {
  idMeal: "52772",
  strMeal: "Teriyali Chicken Casserole",
  strMealThumb:
    "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
  strCategory: "chicken",
};

const RecipeCardWrapper = ({ children }: { children: React.ReactNode }) => {
  <FavoritesProvider>{children} </FavoritesProvider>;
};

describe("RecipeCard", () => {
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

    const { getByText } = render(
      <RecipeCardWrapper>
        <RecipeCard recipe={mockRecipe} onClick={mockOnClick} />
      </RecipeCardWrapper>
    );

    const card = getByText("Teriyaki Chicken Casserole").closest(
      'div[class*="cursor-pointer"]'
    );
    await user.click(card!);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("adiciona e remove dos favoritos", async () => {
    const user = userInfo.setup();
    const mockOnClick = vi.fn();

    const { getByRole } = render(
      <RecipeCardWrapper>
        <RecipeCard recipe={mockRecipe} onClick={mockOnClick} />
      </RecipeCardWrapper>
    );

    const favoriteButton = getByRole("button");

    await user.click(favoriteButton);
    expect(localStorage.getItem("recipeFavorites")).toContain("52772");

    await user.click(favoriteButton);
    expect(localStorage.getItem("recipeFavorites")).not.toContain("52772");
  });
});
