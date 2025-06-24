
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  const links = {
    product: [
      { name: t('tokenization'), href: "#features" },
      { name: t('marketplace'), href: "/marketplace" },
      { name: t('lending'), href: "/loans" },
      { name: t('liquidity'), href: "#features" }
    ],
    support: [
      { name: t('documentation'), href: "#" },
      { name: t('howToStart'), href: "#how-to-start" },
      { name: t('faq'), href: "#" },
      { name: t('support'), href: "#" }
    ],
    company: [
      { name: t('aboutUs'), href: "#about" },
      { name: t('team'), href: "#" },
      { name: t('careers'), href: "#" },
      { name: t('blog'), href: "#" }
    ]
  };

  return (
    <footer className="relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Логотип и описание */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 neon-glow"></div>
              <span className="text-xl font-bold gradient-text">Cosmo RWA</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t('platformDescription')}
            </p>
            
            {/* Социальные сети */}
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Продукт */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('product')}</h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('supportSection')}</h3>
            <ul className="space-y-2">
              {links.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              {t('copyright')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                {t('privacyPolicy')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                {t('termsOfUse')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                {t('legalInformation')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
