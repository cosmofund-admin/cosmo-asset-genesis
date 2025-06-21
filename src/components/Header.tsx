
import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: "Главная", href: "#home" },
    { name: "Маркетплейс", action: () => navigate('/marketplace') },
    { name: "Как начать", href: "#guide" },
    { name: "О проекте", href: "#about" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 neon-glow"></div>
            <span className="text-xl font-bold gradient-text">Cosmo RWA</span>
          </div>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={item.action || (() => {})}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:neon-text"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Кнопка подключения кошелька */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="futuristic-btn" onClick={() => navigate('/auth')}>
              <Wallet className="w-4 h-4 mr-2" />
              Войти
            </Button>
          </div>

          {/* Мобильное меню */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Мобильная навигация */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.action) item.action();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <Button className="w-full futuristic-btn mt-4" onClick={() => navigate('/auth')}>
                <Wallet className="w-4 h-4 mr-2" />
                Войти
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
