import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Login from "./pages/Login";
import Foods from "./pages/Foods";
import Drinks from "./pages/Drinks";
import RecipeDetails from "./pages/RecipeDetails";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FavoritesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/comidas"
                element={
                  <ProtectedRoute>
                    <Foods />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bebidas"
                element={
                  <ProtectedRoute>
                    <Drinks />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/comidas/:id"
                element={
                  <ProtectedRoute>
                    <RecipeDetails type="meal" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bebidas/:id"
                element={
                  <ProtectedRoute>
                    <RecipeDetails type="drink" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explorar"
                element={
                  <ProtectedRoute>
                    <Explore />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/perfil"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/receitas-favoritas"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FavoritesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
