import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMealById, getDrinkById, type Recipe } from "../services/api";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useFavorites } from "../contexts/FavoritesContext";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface RecipeDetailsProps {
  type: "meal" | "drink";
}

export default function RecipeDetails({ type }: RecipeDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: recipe, isLoading } = useQuery<Recipe | null>({
    queryKey: [type, id],
    queryFn: () => (type === "meal" ? getMealById(id!) : getDrinkById(id!)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Receita não encontrada</p>
      </div>
    );
  }

  const recipeId = recipe.idMeal || recipe.idDrink || "";
  const name = recipe.strMeal || recipe.strDrink || "";
  const thumb = recipe.strMealThumb || recipe.strDrinkThumb || "";
  const favorite = isFavorite(recipeId);

  const ingredients = Object.keys(recipe)
    .filter((key) => key.startsWith("strIngredient") && recipe[key])
    .map((key) => {
      const measureKey = `strMeasure${key.replace("strIngredient", "")}`;
      return `${recipe[measureKey]} ${recipe[key]}`;
    });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copiado para área de transferência!");
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="relative h-80 overflow-hidden">
        <img src={thumb} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full shadow-medium"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => toggleFavorite(recipeId)}
              className="rounded-full shadow-medium"
            >
              <Heart className={favorite ? "fill-primary text-primary" : ""} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleShare}
              className="rounded-full shadow-medium"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <Card className="p-6 shadow-strong">
          <h1 className="text-3xl font-bold text-foreground mb-4">{name}</h1>

          {recipe.strCategory && (
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {recipe.strCategory}
              </span>
              {recipe.strArea && (
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                  {recipe.strArea}
                </span>
              )}
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Ingredientes
            </h2>
            <ul className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Modo de Preparo
            </h2>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {recipe.strInstructions}
            </p>
          </div>

          {/* Video */}
          {recipe.strYoutube && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Vídeo
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={recipe.strYoutube.replace("watch?v=", "embed/")}
                  title={name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
