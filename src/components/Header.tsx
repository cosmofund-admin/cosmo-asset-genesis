
import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMetaMask } from "@/hooks/useMetaMask";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { account, isConnected, isConnecting, connectWallet, disconnectWallet } = useMetaMask();
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    // Если мы не на главной странице, сначала переходим на неё
    if (window.location.pathname !== '/') {
      navigate('/');
      // Даём время для загрузки страницы
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navigation = [
    { name: t('home'), action: () => scrollToSection('home') },
    { name: t('marketplace'), action: () => navigate('/marketplace') },
    { name: t('howToStart'), action: () => scrollToSection('how-to-start') },
    { name: t('about'), action: () => scrollToSection('about') },
  ];

  const handleWalletAction = () => {
    if (isConnected) {
      navigate('/dashboard');
    } else {
      connectWallet();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

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
                onClick={item.action}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:neon-text"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Селектор языка и кнопка кошелька */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            
            {isConnected && (
              <Button
                variant="ghost"
                size="sm"
                onClick={disconnectWallet}
                className="text-muted-foreground hover:text-foreground"
              >
                {t('disconnect')}
              </Button>
            )}
            
            <Button 
              className="futuristic-btn" 
              onClick={handleWalletAction}
              disabled={isConnecting}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnecting 
                ? t('connectingWallet')
                : isConnected 
                  ? formatAddress(account!)
                  : t('connectMetaMask')
              }
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
                    item.action();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              
              <div className="flex flex-col space-y-2 pt-4">
                <LanguageSelector />
                
                {isConnected && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      disconnectWallet();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-muted-foreground hover:text-foreground"
                  >
                    {t('disconnect')}
                  </Button>
                )}
                
                <Button 
                  className="w-full futuristic-btn" 
                  onClick={() => {
                    handleWalletAction();
                    setIsMenuOpen(false);
                  }}
                  disabled={isConnecting}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isConnecting 
                    ? t('connectingWallet')
                    : isConnected 
                      ? formatAddress(account!)
                      : t('connectMetaMask')
                  }
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
