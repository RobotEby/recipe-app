import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { RecipeCard } from "../components/RecipeCard";
import { useFavorites } from "../contexts/FavoritesContext";
import { getMealById, getDrinkById, type Recipe } from "../services/api";
import { Loader2, Heart } from "lucide-react";

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const { data: recipes = [], isLoading } = useQuery<Recipe[]>({
    queryKey: ["favorites", favorites],
    queryFn: async () => {
      const recipePromises = favorites.map(async (id: string) => {
        let recipe = await getMealById(id);
        if (!recipe) {
          recipe = await getDrinkById(id);
        }
        return recipe;
      });
      const results = await Promise.all(recipePromises);
      return results.filter((r: Recipe | null): r is Recipe => r !== null);
    },
    enabled: favorites.length > 0,
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Favoritos" />

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhuma receita favorita ainda
            </h3>
            <p className="text-muted-foreground">
              Comece a explorar e favorite suas receitas preferidas!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.map((recipe) => {
              const id = recipe.idMeal || recipe.idDrink || "";
              const isMeal = !!recipe.idMeal;
              return (
                <RecipeCard
                  key={id}
                  recipe={recipe}
                  onClick={() =>
                    navigate(`/${isMeal ? "comidas" : "bebidas"}/${id}`)
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
