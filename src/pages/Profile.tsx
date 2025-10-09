import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { User, Heart, LogOut } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Perfil" />

      <div className="container mx-auto px-4 py-8">
        <Card className="p-6 mb-6 shadow-medium">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-medium">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {user?.name}
              </h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate("/receitas-favoritas")}
            >
              <Heart className="w-5 h-5 mr-3" />
              Receitas Favoritas
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sair
            </Button>
          </div>
        </Card>

        <Card className="p-6 shadow-medium">
          <h3 className="font-semibold text-foreground mb-4">Sobre o App</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Descubra, compartilhe e favorite receitas incríveis de comidas e
            bebidas do mundo todo. Use a busca para encontrar suas receitas
            favoritas ou explore novas opções.
          </p>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
