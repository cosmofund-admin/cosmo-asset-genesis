
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ar' | 'pt' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  // Navigation
  about: {
    ru: 'О проекте',
    en: 'About',
    es: 'Acerca de',
    fr: 'À propos',
    de: 'Über uns',
    zh: '关于',
    ja: 'について',
    ar: 'حول',
    pt: 'Sobre',
    hi: 'के बारे में'
  },
  marketplace: {
    ru: 'Маркетплейс',
    en: 'Marketplace',
    es: 'Mercado',
    fr: 'Marché',
    de: 'Marktplatz',
    zh: '市场',
    ja: 'マーケット',
    ar: 'السوق',
    pt: 'Mercado',
    hi: 'बाज़ार'
  },
  howToStart: {
    ru: 'Как начать',
    en: 'How to Start',
    es: 'Cómo Empezar',
    fr: 'Comment Commencer',
    de: 'Wie man anfängt',
    zh: '如何开始',
    ja: '始め方',
    ar: 'كيف تبدأ',
    pt: 'Como Começar',
    hi: 'कैसे शुरू करें'
  },
  connectWallet: {
    ru: 'Подключить кошелек',
    en: 'Connect Wallet',
    es: 'Conectar Billetera',
    fr: 'Connecter Portefeuille',
    de: 'Wallet verbinden',
    zh: '连接钱包',
    ja: 'ウォレット接続',
    ar: 'ربط المحفظة',
    pt: 'Conectar Carteira',
    hi: 'वॉलेट कनेक्ट करें'
  },

  // Hero Section
  heroTitle: {
    ru: 'Будущее токенизации активов',
    en: 'The Future of Asset Tokenization',
    es: 'El Futuro de la Tokenización de Activos',
    fr: 'L\'Avenir de la Tokenisation d\'Actifs',
    de: 'Die Zukunft der Asset-Tokenisierung',
    zh: '资产代币化的未来',
    ja: '資産トークン化の未来',
    ar: 'مستقبل ترميز الأصول',
    pt: 'O Futuro da Tokenização de Ativos',
    hi: 'संपत्ति टोकनीकरण का भविष्य'
  },
  heroSubtitle: {
    ru: 'Децентрализованная платформа для токенизации недвижимости, товаров и других активов с автоматическим созданием трех уникальных токенов',
    en: 'Decentralized platform for tokenizing real estate, goods and other assets with automatic creation of three unique tokens',
    es: 'Plataforma descentralizada para tokenización de bienes raíces, bienes y otros activos',
    fr: 'Plateforme décentralisée pour la tokenisation d\'immobilier, de biens et d\'autres actifs',
    de: 'Dezentrale Plattform für die Tokenisierung von Immobilien, Waren und anderen Vermögenswerten',
    zh: '去中心化平台，用于房地产、商品和其他资产的代币化，自动创建三种独特代币',
    ja: '不動産、商品、その他の資産をトークン化する分散型プラットフォーム',
    ar: 'منصة لامركزية لترميز العقارات والسلع والأصول الأخرى',
    pt: 'Plataforma descentralizada para tokenização de imóveis, bens e outros ativos',
    hi: 'रियल एस्टेट, वस्तुओं और अन्य संपत्तियों के टोकनीकरण के लिए विकेंद्रीकृत मंच'
  },

  // Features Section
  futureEcosystem: {
    ru: 'Экосистема будущего',
    en: 'Future Ecosystem',
    es: 'Ecosistema Futuro',
    fr: 'Écosystème Futur',
    de: 'Zukunfts-Ökosystem',
    zh: '未来生态系统',
    ja: '未来のエコシステム',
    ar: 'النظام البيئي المستقبلي',
    pt: 'Ecossistema Futuro',
    hi: 'भविष्य का पारिस्थितिकी तंत्र'
  },
  futureEcosystemDesc: {
    ru: 'Полная экосистема для работы с токенизированными активами реального мира',
    en: 'Complete ecosystem for working with tokenized real-world assets',
    es: 'Ecosistema completo para trabajar con activos tokenizados del mundo real',
    fr: 'Écosystème complet pour travailler avec des actifs tokenisés du monde réel',
    de: 'Vollständiges Ökosystem für die Arbeit mit tokenisierten realen Vermögenswerten',
    zh: '用于处理代币化现实世界资产的完整生态系统',
    ja: 'トークン化された実世界の資産を扱うための完全なエコシステム',
    ar: 'نظام بيئي كامل للعمل مع الأصول المرمزة في العالم الحقيقي',
    pt: 'Ecossistema completo para trabalhar com ativos tokenizados do mundo real',
    hi: 'टोकनीकृत वास्तविक संसार की संपत्तियों के साथ काम करने के लिए पूर्ण पारिस्थितिकी तंत्र'
  },
  
  // Feature items
  assetTokenization: {
    ru: 'Токенизация активов',
    en: 'Asset Tokenization',
    es: 'Tokenización de Activos',
    fr: 'Tokenisation d\'Actifs',
    de: 'Asset-Tokenisierung',
    zh: '资产代币化',
    ja: '資産トークン化',
    ar: 'ترميز الأصول',
    pt: 'Tokenização de Ativos',
    hi: 'संपत्ति टोकनीकरण'
  },
  assetTokenizationDesc: {
    ru: 'Преобразуйте любые активы в цифровые токены на блокчейне',
    en: 'Transform any assets into digital tokens on blockchain',
    es: 'Transforma cualquier activo en tokens digitales en blockchain',
    fr: 'Transformez tous les actifs en jetons numériques sur blockchain',
    de: 'Verwandeln Sie beliebige Vermögenswerte in digitale Token auf der Blockchain',
    zh: '将任何资产转换为区块链上的数字代币',
    ja: '任意の資産をブロックチェーン上のデジタルトークンに変換',
    ar: 'حول أي أصول إلى رموز رقمية على البلوك تشين',
    pt: 'Transforme qualquer ativo em tokens digitais na blockchain',
    hi: 'किसी भी संपत्ति को ब्लॉकचेन पर डिजिटल टोकन में बदलें'
  },
  marketplaceDesc: {
    ru: 'Торгуйте токенизированными активами на децентрализованной бирже',
    en: 'Trade tokenized assets on decentralized exchange',
    es: 'Comercia activos tokenizados en intercambio descentralizado',
    fr: 'Échangez des actifs tokenisés sur une bourse décentralisée',
    de: 'Handeln Sie tokenisierte Vermögenswerte an dezentralen Börsen',
    zh: '在去中心化交易所交易代币化资产',
    ja: '分散型取引所でトークン化された資産を取引',
    ar: 'تداول الأصول المرمزة في البورصة اللامركزية',
    pt: 'Negocie ativos tokenizados em exchange descentralizada',
    hi: 'विकेंद्रीकृत एक्सचेंज पर टोकनीकृत संपत्तियों का व्यापार करें'
  },
  liquidityPools: {
    ru: 'Пулы ликвидности',
    en: 'Liquidity Pools',
    es: 'Pools de Liquidez',
    fr: 'Pools de Liquidité',
    de: 'Liquiditätspools',
    zh: '流动性池',
    ja: '流動性プール',
    ar: 'مجمعات السيولة',
    pt: 'Pools de Liquidez',
    hi: 'तरलता पूल'
  },
  liquidityPoolsDesc: {
    ru: 'Обеспечивайте ликвидность и получайте доходность',
    en: 'Provide liquidity and earn returns',
    es: 'Proporciona liquidez y obtén retornos',
    fr: 'Fournissez de la liquidité et obtenez des rendements',
    de: 'Stellen Sie Liquidität bereit und erzielen Sie Renditen',
    zh: '提供流动性并获得收益',
    ja: '流動性を提供して収益を得る',
    ar: 'قدم السيولة واكسب العوائد',
    pt: 'Forneça liquidez e obtenha retornos',
    hi: 'तरलता प्रदान करें और रिटर्न अर्जित करें'
  },
  lending: {
    ru: 'Кредитование',
    en: 'Lending',
    es: 'Préstamos',
    fr: 'Prêts',
    de: 'Kreditvergabe',
    zh: '借贷',
    ja: '貸付',
    ar: 'الإقراض',
    pt: 'Empréstimos',
    hi: 'उधार देना'
  },
  lendingDesc: {
    ru: 'Получайте кредиты под залог токенизированных активов',
    en: 'Get loans secured by tokenized assets',
    es: 'Obtén préstamos garantizados por activos tokenizados',
    fr: 'Obtenez des prêts garantis par des actifs tokenisés',
    de: 'Erhalten Sie durch tokenisierte Vermögenswerte besicherte Kredite',
    zh: '获得由代币化资产担保的贷款',
    ja: 'トークン化された資産で担保されたローンを取得',
    ar: 'احصل على قروض مضمونة بالأصول المرمزة',
    pt: 'Obtenha empréstimos garantidos por ativos tokenizados',
    hi: 'टोकनीकृत संपत्तियों द्वारा सुरक्षित ऋण प्राप्त करें'
  },
  personalCabinet: {
    ru: 'Личный кабинет',
    en: 'Personal Cabinet',
    es: 'Gabinete Personal',
    fr: 'Cabinet Personnel',
    de: 'Persönliches Kabinett',
    zh: '个人中心',
    ja: '個人キャビネット',
    ar: 'الخزانة الشخصية',
    pt: 'Gabinete Pessoal',
    hi: 'व्यक्तिगत कैबिनेट'
  },
  personalCabinetDesc: {
    ru: 'Управляйте своими активами и отслеживайте доходность',
    en: 'Manage your assets and track performance',
    es: 'Gestiona tus activos y rastrea el rendimiento',
    fr: 'Gérez vos actifs et suivez les performances',
    de: 'Verwalten Sie Ihre Vermögenswerte und verfolgen Sie die Leistung',
    zh: '管理您的资产并跟踪表现',
    ja: '資産を管理し、パフォーマンスを追跡',
    ar: 'إدارة أصولك وتتبع الأداء',
    pt: 'Gerencie seus ativos e acompanhe o desempenho',
    hi: 'अपनी संपत्तियों का प्रबंधन करें और प्रदर्शन को ट्रैक करें'
  },
  community: {
    ru: 'Сообщество',
    en: 'Community',
    es: 'Comunidad',
    fr: 'Communauté',
    de: 'Gemeinschaft',
    zh: '社区',
    ja: 'コミュニティ',
    ar: 'المجتمع',
    pt: 'Comunidade',
    hi: 'समुदाय'
  },
  communityDesc: {
    ru: 'Присоединяйтесь к сообществу инвесторов и трейдеров',
    en: 'Join the community of investors and traders',
    es: 'Únete a la comunidad de inversores y traders',
    fr: 'Rejoignez la communauté d\'investisseurs et de traders',
    de: 'Treten Sie der Gemeinschaft von Investoren und Händlern bei',
    zh: '加入投资者和交易者社区',
    ja: '投資家とトレーダーのコミュニティに参加',
    ar: 'انضم إلى مجتمع المستثمرين والمتداولين',
    pt: 'Junte-se à comunidade de investidores e traders',
    hi: 'निवेशकों और व्यापारियों के समुदाय में शामिल हों'
  },

  // Token System
  threeTokenSystem: {
    ru: 'Система трех токенов',
    en: 'Three Token System',
    es: 'Sistema de Tres Tokens',
    fr: 'Système de Trois Jetons',
    de: 'Drei-Token-System',
    zh: '三代币系统',
    ja: '3トークンシステム',
    ar: 'نظام الثلاثة رموز',
    pt: 'Sistema de Três Tokens',
    hi: 'तीन टोकन सिस्टम'
  },
  stableTokensTitle: {
    ru: 'Стабильные токены',
    en: 'Stable Tokens',
    es: 'Tokens Estables',
    fr: 'Jetons Stables',
    de: 'Stabile Token',
    zh: '稳定代币',
    ja: 'ステーブルトークン',
    ar: 'الرموز المستقرة',
    pt: 'Tokens Estáveis',
    hi: 'स्थिर टोकन'
  },
  stableTokensDescription: {
    ru: 'Основная стоимость актива с минимальной волатильностью',
    en: 'Main asset value with minimal volatility',
    es: 'Valor principal del activo con volatilidad mínima',
    fr: 'Valeur principale de l\'actif avec volatilité minimale',
    de: 'Hauptwert des Vermögenswertes mit minimaler Volatilität',
    zh: '主要资产价值，波动性最小',
    ja: '最小限のボラティリティでの主要資産価値',
    ar: 'القيمة الأصلية الرئيسية مع تقلبات طفيفة',
    pt: 'Valor principal do ativo com volatilidade mínima',
    hi: 'न्यूनतम अस्थिरता के साथ मुख्य संपत्ति मूल्य'
  },
  supportTokensTitle: {
    ru: 'Токены поддержки',
    en: 'Support Tokens',
    es: 'Tokens de Soporte',
    fr: 'Jetons de Support',
    de: 'Support-Token',
    zh: '支持代币',
    ja: 'サポートトークン',
    ar: 'رموز الدعم',
    pt: 'Tokens de Suporte',
    hi: 'समर्थन टोकन'
  },
  supportTokensDescription: {
    ru: 'Обеспечивают ликвидность и стабильность системы',
    en: 'Provide liquidity and system stability',
    es: 'Proporcionan liquidez y estabilidad del sistema',
    fr: 'Fournissent la liquidité et la stabilité du système',
    de: 'Bieten Liquidität und Systemstabilität',
    zh: '提供流动性和系统稳定性',
    ja: '流動性とシステムの安定性を提供',
    ar: 'توفر السيولة واستقرار النظام',
    pt: 'Fornecem liquidez e estabilidade do sistema',
    hi: 'तरलता और सिस्टम स्थिरता प्रदान करते हैं'
  },
  brandTokensTitle: {
    ru: 'Бренд токены',
    en: 'Brand Tokens',
    es: 'Tokens de Marca',
    fr: 'Jetons de Marque',
    de: 'Marken-Token',
    zh: '品牌代币',
    ja: 'ブランドトークン',
    ar: 'رموز العلامة التجارية',
    pt: 'Tokens de Marca',
    hi: 'ब्रांड टोकन'
  },
  brandTokensDescription: {
    ru: 'Эксклюзивные права и привилегии владельцев',
    en: 'Exclusive rights and owner privileges',
    es: 'Derechos exclusivos y privilegios del propietario',
    fr: 'Droits exclusifs et privilèges du propriétaire',
    de: 'Exklusive Rechte und Eigentümerprivilegien',
    zh: '专属权利和所有者特权',
    ja: '独占的権利と所有者特権',
    ar: 'حقوق حصرية وامتيازات المالك',
    pt: 'Direitos exclusivos e privilégios do proprietário',
    hi: 'विशेष अधिकार और मालिक विशेषाधिकार'
  },

  // Popular Assets
  popularAssets: {
    ru: 'Популярные активы',
    en: 'Popular Assets',
    es: 'Activos Populares',
    fr: 'Actifs Populaires',
    de: 'Beliebte Vermögenswerte',
    zh: '热门资产',
    ja: '人気資産',
    ar: 'الأصول الشائعة',
    pt: 'Ativos Populares',
    hi: 'लोकप्रिय संपत्तियां'
  },
  popularAssetsDesc: {
    ru: 'Изучите самые востребованные токенизированные активы на нашей платформе',
    en: 'Explore the most sought-after tokenized assets on our platform',
    es: 'Explora los activos tokenizados más demandados en nuestra plataforma',
    fr: 'Explorez les actifs tokenisés les plus recherchés sur notre plateforme',
    de: 'Entdecken Sie die gefragtesten tokenisierten Vermögenswerte auf unserer Plattform',
    zh: '探索我们平台上最受欢迎的代币化资产',
    ja: '当プラットフォームで最も人気のあるトークン化資産を探索',
    ar: 'اكتشف الأصول المرمزة الأكثر طلباً على منصتنا',
    pt: 'Explore os ativos tokenizados mais procurados em nossa plataforma',
    hi: 'हमारे प्लेटफॉर्म पर सबसे अधिक मांग वाली टोकनीकृत संपत्तियों का अन्वेषण करें'
  },
  luxuryApartmentNYC: {
    ru: 'Роскошная квартира в Нью-Йорке',
    en: 'Luxury Apartment in NYC',
    es: 'Apartamento de Lujo en NYC',
    fr: 'Appartement de Luxe à NYC',
    de: 'Luxus-Apartment in NYC',
    zh: '纽约豪华公寓',
    ja: 'NYC高級アパート',
    ar: 'شقة فاخرة في نيويورك',
    pt: 'Apartamento de Luxo em NYC',
    hi: 'न्यूयॉर्क में लक्जरी अपार्टमेंट'
  },
  realEstate: {
    ru: 'Недвижимость',
    en: 'Real Estate',
    es: 'Bienes Raíces',
    fr: 'Immobilier',
    de: 'Immobilien',
    zh: '房地产',
    ja: '不動産',
    ar: 'العقارات',
    pt: 'Imóveis',
    hi: 'रियल एस्टेट'
  },
  newYorkUSA: {
    ru: 'Нью-Йорк, США',
    en: 'New York, USA',
    es: 'Nueva York, EE.UU.',
    fr: 'New York, États-Unis',
    de: 'New York, USA',
    zh: '美国纽约',
    ja: 'ニューヨーク、アメリカ',
    ar: 'نيويورك، الولايات المتحدة الأمريكية',
    pt: 'Nova York, EUA',
    hi: 'न्यूयॉर्क, यूएसए'
  },
  commercialOfficeSpace: {
    ru: 'Коммерческое офисное помещение',
    en: 'Commercial Office Space',
    es: 'Espacio de Oficina Comercial',
    fr: 'Espace de Bureau Commercial',
    de: 'Kommerzielle Bürofläche',
    zh: '商业办公空间',
    ja: '商業オフィススペース',
    ar: 'مساحة مكتبية تجارية',
    pt: 'Espaço de Escritório Comercial',
    hi: 'वाणिज्यिक कार्यालय स्थान'
  },
  commercialRealEstate: {
    ru: 'Коммерческая недвижимость',
    en: 'Commercial Real Estate',
    es: 'Bienes Raíces Comerciales',
    fr: 'Immobilier Commercial',
    de: 'Gewerbeimmobilien',
    zh: '商业房地产',
    ja: '商業不動産',
    ar: 'العقارات التجارية',
    pt: 'Imóveis Comerciais',
    hi: 'वाणिज्यिक रियल एस्टेट'
  },
  londonUK: {
    ru: 'Лондон, Великобритания',
    en: 'London, UK',
    es: 'Londres, Reino Unido',
    fr: 'Londres, Royaume-Uni',
    de: 'London, Großbritannien',
    zh: '英国伦敦',
    ja: 'ロンドン、イギリス',
    ar: 'لندن، المملكة المتحدة',
    pt: 'Londres, Reino Unido',
    hi: 'लंदन, यूके'
  },
  vintageWineCollection: {
    ru: 'Коллекция винтажных вин',
    en: 'Vintage Wine Collection',
    es: 'Colección de Vinos Vintage',
    fr: 'Collection de Vins Vintage',
    de: 'Vintage-Weinkollektion',
    zh: '葡萄酒收藏',
    ja: 'ヴィンテージワインコレクション',
    ar: 'مجموعة النبيذ العتيق',
    pt: 'Coleção de Vinhos Vintage',
    hi: 'विंटेज वाइन संग्रह'
  },
  goods: {
    ru: 'Товары',
    en: 'Goods',
    es: 'Bienes',
    fr: 'Biens',
    de: 'Waren',
    zh: '商品',
    ja: '商品',
    ar: 'السلع',
    pt: 'Bens',
    hi: 'वस्तुएं'
  },
  bordeauxFrance: {
    ru: 'Бордо, Франция',
    en: 'Bordeaux, France',
    es: 'Burdeos, Francia',
    fr: 'Bordeaux, France',
    de: 'Bordeaux, Frankreich',
    zh: '法国波尔多',
    ja: 'ボルドー、フランス',
    ar: 'بوردو، فرنسا',
    pt: 'Bordeaux, França',
    hi: 'बोर्डो, फ्रांस'
  },
  totalAssetValue: {
    ru: 'Общая стоимость актива',
    en: 'Total Asset Value',
    es: 'Valor Total del Activo',
    fr: 'Valeur Totale de l\'Actif',
    de: 'Gesamtwert des Vermögenswerts',
    zh: '总资产价值',
    ja: '総資産価値',
    ar: 'إجمالي قيمة الأصل',
    pt: 'Valor Total do Ativo',
    hi: 'कुल संपत्ति मूल्य'
  },
  buy: {
    ru: 'Купить',
    en: 'Buy',
    es: 'Comprar',
    fr: 'Acheter',
    de: 'Kaufen',
    zh: '购买',
    ja: '購入',
    ar: 'شراء',
    pt: 'Comprar',
    hi: 'खरीदें'
  },
  liquidity: {
    ru: 'Ликвидность',
    en: 'Liquidity',
    es: 'Liquidez',
    fr: 'Liquidité',
    de: 'Liquidität',
    zh: '流动性',
    ja: '流動性',
    ar: 'السيولة',
    pt: 'Liquidez',
    hi: 'तरलता'
  },
  openFullMarketplace: {
    ru: 'Открыть полный маркетплейс',
    en: 'Open Full Marketplace',
    es: 'Abrir Mercado Completo',
    fr: 'Ouvrir le Marché Complet',
    de: 'Vollständigen Marktplatz öffnen',
    zh: '打开完整市场',
    ja: 'フルマーケットプレイスを開く',
    ar: 'افتح السوق الكامل',
    pt: 'Abrir Mercado Completo',
    hi: 'पूरा मार्केटप्लेस खोलें'
  },

  // Footer
  company: {
    ru: 'Компания',
    en: 'Company',
    es: 'Empresa',
    fr: 'Entreprise',
    de: 'Unternehmen',
    zh: '公司',
    ja: '会社',
    ar: 'الشركة',
    pt: 'Empresa',
    hi: 'कंपनी'
  },
  support: {
    ru: 'Поддержка',
    en: 'Support',
    es: 'Soporte',
    fr: 'Support',
    de: 'Support',
    zh: '支持',
    ja: 'サポート',
    ar: 'الدعم',
    pt: 'Suporte',
    hi: 'सहायता'
  },
  legal: {
    ru: 'Правовая информация',
    en: 'Legal',
    es: 'Legal',
    fr: 'Légal',
    de: 'Rechtliches',
    zh: '法律',
    ja: '法的',
    ar: 'قانوني',
    pt: 'Legal',
    hi: 'कानूनी'
  },
  privacyPolicy: {
    ru: 'Политика конфиденциальности',
    en: 'Privacy Policy',
    es: 'Política de Privacidad',
    fr: 'Politique de Confidentialité',
    de: 'Datenschutzrichtlinie',
    zh: '隐私政策',
    ja: 'プライバシーポリシー',
    ar: 'سياسة الخصوصية',
    pt: 'Política de Privacidade',
    hi: 'गोपनीयता नीति'
  },
  termsOfService: {
    ru: 'Условия использования',
    en: 'Terms of Service',
    es: 'Términos de Servicio',
    fr: 'Conditions de Service',
    de: 'Nutzungsbedingungen',
    zh: '服务条款',
    ja: '利用規約',
    ar: 'شروط الخدمة',
    pt: 'Termos de Serviço',
    hi: 'सेवा की शर्तें'
  },
  legalInfo: {
    ru: 'Правовая информация',
    en: 'Legal Information',
    es: 'Información Legal',
    fr: 'Informations Légales',
    de: 'Rechtliche Informationen',
    zh: '法律信息',
    ja: '法的情報',
    ar: 'المعلومات القانونية',
    pt: 'Informações Legais',
    hi: 'कानूनी जानकारी'
  },
  allRightsReserved: {
    ru: '© 2025 Cosmo RWA. Все права защищены',
    en: '© 2025 Cosmo RWA. All rights reserved',
    es: '© 2025 Cosmo RWA. Todos los derechos reservados',
    fr: '© 2025 Cosmo RWA. Tous droits réservés',
    de: '© 2025 Cosmo RWA. Alle Rechte vorbehalten',
    zh: '© 2025 Cosmo RWA. 版权所有',
    ja: '© 2025 Cosmo RWA. 全権利留保',
    ar: '© 2025 Cosmo RWA. جميع الحقوق محفوظة',
    pt: '© 2025 Cosmo RWA. Todos os direitos reservados',
    hi: '© 2025 Cosmo RWA. सभी अधिकार सुरक्षित'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    const translation = translations[key as keyof typeof translations];
    if (!translation) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
