import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { UtensilsCrossed, Wine, Sparkles } from "lucide-react";
import { getRandomMeal, getRandomDrink } from "../services/api";
import { toast } from "sonner";

export default function Explore() {
  const navigate = useNavigate();

  const handleRandomMeal = async () => {
    try {
      const meal = await getRandomMeal();
      if (meal) {
        navigate(`/comidas/${meal.idMeal}`);
      }
    } catch {
      toast.error("Erro ao buscar receita aleatória");
    }
  };

  const handleRandomDrink = async () => {
    try {
      const drink = await getRandomDrink();
      if (drink) {
        navigate(`/bebidas/${drink.idDrink}`);
      }
    } catch {
      toast.error("Erro ao buscar bebida aleatória");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Explorar" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-8 text-center space-y-4 hover:shadow-medium transition-smooth">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
              <UtensilsCrossed className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Explorar Comidas
            </h2>
            <p className="text-muted-foreground">
              Descubra receitas deliciosas de comidas do mundo todo
            </p>
            <div className="space-y-3 pt-4">
              <Button
                variant="default"
                className="w-full"
                onClick={() => navigate("/comidas")}
              >
                Ver Todas
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleRandomMeal}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Receita Aleatória
              </Button>
            </div>
          </Card>

          <Card className="p-8 text-center space-y-4 hover:shadow-medium transition-smooth">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mx-auto">
              <Wine className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Explorar Bebidas
            </h2>
            <p className="text-muted-foreground">
              Encontre receitas incríveis de drinks e coquetéis
            </p>
            <div className="space-y-3 pt-4">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => navigate("/bebidas")}
              >
                Ver Todas
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleRandomDrink}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Bebida Aleatória
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
