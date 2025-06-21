
import { Building, ShoppingCart, CreditCard, BarChart3, Wallet, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Building,
      title: "Токенизация активов",
      description: "Превратите любой реальный актив в цифровые токены с автоматическим распределением",
      color: "text-blue-400"
    },
    {
      icon: ShoppingCart,
      title: "Маркетплейс",
      description: "Торгуйте токенизированными активами в децентрализованной среде",
      color: "text-purple-400"
    },
    {
      icon: BarChart3,
      title: "Пулы ликвидности",
      description: "Создавайте и управляйте ликвидностью для максимизации доходности",
      color: "text-green-400"
    },
    {
      icon: CreditCard,
      title: "Кредитование",
      description: "Получайте кредиты под залог токенов или выдавайте займы другим пользователям",
      color: "text-cyan-400"
    },
    {
      icon: Wallet,
      title: "Личный кабинет",
      description: "Отслеживайте все ваши активы, транзакции и доходность в одном месте",
      color: "text-yellow-400"
    },
    {
      icon: Users,
      title: "Сообщество",
      description: "Присоединяйтесь к растущему сообществу инвесторов и владельцев активов",
      color: "text-pink-400"
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Экосистема будущего
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cosmo RWA предоставляет полный набор инструментов для работы с токенизированными активами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="asset-card p-8 rounded-xl fade-in-up hover:neon-glow transition-all duration-300"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <feature.icon className={`h-16 w-16 ${feature.color} mb-6`} />
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Токены схема */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-12 gradient-text">
            Система трех токенов
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="asset-card p-6 rounded-xl pulse-glow">
              <div className="text-4xl font-bold text-blue-400 mb-2">AST</div>
              <div className="text-lg font-semibold mb-2">Стабильные токены</div>
              <div className="text-3xl font-bold text-blue-400 mb-4">90%</div>
              <p className="text-muted-foreground">
                Основная стоимость актива, обеспечивающая стабильность инвестиций
              </p>
            </div>
            
            <div className="asset-card p-6 rounded-xl pulse-glow" style={{animationDelay: "0.5s"}}>
              <div className="text-4xl font-bold text-purple-400 mb-2">AGT</div>
              <div className="text-lg font-semibold mb-2">Токены поддержки</div>
              <div className="text-3xl font-bold text-purple-400 mb-4">9%</div>
              <p className="text-muted-foreground">
                Поддержка экосистемы и управления активом
              </p>
            </div>
            
            <div className="asset-card p-6 rounded-xl pulse-glow" style={{animationDelay: "1s"}}>
              <div className="text-4xl font-bold text-green-400 mb-2">ABT</div>
              <div className="text-lg font-semibold mb-2">Брендовые токены</div>
              <div className="text-3xl font-bold text-green-400 mb-4">1%</div>
              <p className="text-muted-foreground">
                Эксклюзивные права и премиум-возможности
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
