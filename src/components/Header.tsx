import { Search, User } from 'lucide-react';
import { Input } from '../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  title: string;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export function Header({ title, onSearch, showSearch = false }: HeaderProps) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-primary shadow-medium">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-primary-foreground">{title}</h1>
          <button
            onClick={() => navigate('/perfil')}
            className="p-2 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-smooth"
          >
            <User className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar receitas..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-card border-0 shadow-soft"
            />
          </div>
        )}
      </div>
    </header>
  );
}