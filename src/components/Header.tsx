
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMetaMask } from "@/hooks/useMetaMask";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from '@/hooks/useLanguage';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected, connectWallet, disconnect, account } = useMetaMask();
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('/')}
              className="text-2xl font-bold gradient-text hover:scale-105 transition-transform"
            >
              Cosmo RWA
            </button>
          </div>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('home')}
            </button>
            <button 
              onClick={() => scrollToSection('how-to-start')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('howToStart')}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('about')}
            </button>
            <button 
              onClick={() => handleNavigation('/marketplace')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('marketplace')}
            </button>
          </nav>

          {/* Правая часть */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleNavigation('/dashboard')}
                  className="futuristic-btn"
                >
                  {account ? formatAddress(account) : t('dashboard')}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={disconnect}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t('disconnect')}
                </Button>
              </div>
            ) : (
              <Button 
                onClick={connectWallet} 
                className="futuristic-btn"
                size="sm"
              >
                {t('connectWallet')}
              </Button>
            )}
          </div>

          {/* Мобильное меню кнопка */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('home')}
              </button>
              <button 
                onClick={() => scrollToSection('how-to-start')}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('howToStart')}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('about')}
              </button>
              <button 
                onClick={() => handleNavigation('/marketplace')}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('marketplace')}
              </button>
              
              <div className="border-t border-border/50 pt-2 mt-2">
                {isConnected ? (
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleNavigation('/dashboard')}
                      className="w-full futuristic-btn"
                    >
                      {account ? formatAddress(account) : t('dashboard')}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={disconnect}
                      className="w-full text-muted-foreground hover:text-foreground"
                    >
                      {t('disconnect')}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={connectWallet} 
                    className="w-full futuristic-btn"
                    size="sm"
                  >
                    {t('connectWallet')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
