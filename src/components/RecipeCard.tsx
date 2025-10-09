import { Heart } from "lucide-react";
import { Card } from "../components/ui/card";
import { useFavorites } from "../contexts/FavoritesContext";
import { type Recipe } from "../services/api";
import { cn } from "../lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const id = recipe.idMeal || recipe.idDrink || "";
  const name = recipe.strMeal || recipe.strDrink || "Unnamed Recipe";
  const thumb = recipe.strMealThumb || recipe.strDrinkThumb || "";
  const favorite = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <Card
      className="group relative overflow-hidden cursor-pointer transition-smooth hover:scale-105 hover:shadow-medium bg-card"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={thumb}
          alt={name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-card" />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm transition-smooth hover:scale-110 z-10"
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-smooth",
              favorite ? "fill-primary text-primary" : "text-foreground"
            )}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
          {name}
        </h3>
        {recipe.strCategory && (
          <p className="text-sm text-muted-foreground mt-1">
            {recipe.strCategory}
          </p>
        )}
      </div>
    </Card>
  );
}
