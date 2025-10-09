import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { RecipeCard } from "../components/RecipeCard";
import { Button } from "../components/ui/button";
import {
  getMealsByCategory,
  getMealCategories,
  searchMealsByName,
  type Recipe,
  type Category,
} from "../services/api";
import { Loader2 } from "lucide-react";

export default function Foods() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["mealCategories"],
    queryFn: getMealCategories,
  });

  const { data: recipes = [], isLoading } = useQuery<Recipe[]>({
    queryKey: ["meals", selectedCategory, searchQuery],
    queryFn: () => {
      if (searchQuery) {
        return searchMealsByName(searchQuery);
      }
      return getMealsByCategory(selectedCategory);
    },
  });

  useEffect(() => {
    if (!searchQuery && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].strCategory);
    }
  }, [categories, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Comidas" showSearch onSearch={setSearchQuery} />

      {!searchQuery && (
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.slice(0, 6).map((category) => (
              <Button
                key={category.strCategory}
                variant={
                  selectedCategory === category.strCategory
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => {
                  setSelectedCategory(category.strCategory);
                  setSearchQuery("");
                }}
                className="whitespace-nowrap"
              >
                {category.strCategory}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 pb-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.slice(0, 12).map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onClick={() => navigate(`/comidas/${recipe.idMeal}`)}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
