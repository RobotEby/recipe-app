import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('recipeAppUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email: string, password: string): boolean => {
    if (email.includes('@') && password.length >= 6) {
      const newUser = { email, name: email.split('@')[0] };
      setUser(newUser);
      localStorage.setItem('recipeAppUser', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('recipeAppUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
