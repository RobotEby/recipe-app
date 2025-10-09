const MEAL_API = "https://www.themealdb.com/api/json/v1/1";
const COCKTAIL_API = "https://www.thecocktaildb.com/api/json/v1/1";

export interface Recipe {
  idMeal?: string;
  idDrink?: string;
  strMeal?: string;
  strDrink?: string;
  strMealThumb?: string;
  strDrinkThumb?: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strYoutube?: string;
  [key: string]: string | undefined;
}

export interface Category {
  idCategory?: string;
  strCategory: string;
  strCategoryThumb?: string;
  strCategoryDescription?: string;
}

export const getMealsByCategory = async (
  category: string
): Promise<Recipe[]> => {
  const response = await fetch(`${MEAL_API}/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals || [];
};

export const getMealById = async (id: string): Promise<Recipe | null> => {
  const response = await fetch(`${MEAL_API}/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals?.[0] || null;
};

export const searchMealsByName = async (name: string): Promise<Recipe[]> => {
  const response = await fetch(`${MEAL_API}/search.php?s=${name}`);
  const data = await response.json();
  return data.meals || [];
};

export const getMealCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${MEAL_API}/categories.php`);
  const data = await response.json();
  return data.categories || [];
};

export const getRandomMeal = async (): Promise<Recipe | null> => {
  const response = await fetch(`${MEAL_API}/random.php`);
  const data = await response.json();
  return data.meals?.[0] || null;
};

export const getDrinksByCategory = async (
  category: string
): Promise<Recipe[]> => {
  const response = await fetch(`${COCKTAIL_API}/filter.php?c=${category}`);
  const data = await response.json();
  return data.drinks || [];
};

export const getDrinkById = async (id: string): Promise<Recipe | null> => {
  const response = await fetch(`${COCKTAIL_API}/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks?.[0] || null;
};

export const searchDrinksByName = async (name: string): Promise<Recipe[]> => {
  const response = await fetch(`${COCKTAIL_API}/search.php?s=${name}`);
  const data = await response.json();
  return data.drinks || [];
};

export const getDrinkCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${COCKTAIL_API}/list.php?c=list`);
  const data = await response.json();
  return (
    data.drinks?.map((d: { strCategory: string }) => ({
      strCategory: d.strCategory,
    })) || []
  );
};

export const getRandomDrink = async (): Promise<Recipe | null> => {
  const response = await fetch(`${COCKTAIL_API}/random.php`);
  const data = await response.json();
  return data.drinks?.[0] || null;
};
