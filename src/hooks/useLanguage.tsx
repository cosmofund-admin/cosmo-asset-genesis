
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en' | 'zh' | 'hi' | 'ar' | 'pt' | 'bn' | 'es' | 'fr' | 'ur';

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
    zh: '关于',
    hi: 'के बारे में',
    ar: 'حول',
    pt: 'Sobre',
    bn: 'সম্পর্কে',
    es: 'Acerca de',
    fr: 'À propos',
    ur: 'کے بارے میں'
  },
  marketplace: {
    ru: 'Маркетплейс',
    en: 'Marketplace',
    zh: '市场',
    hi: 'बाज़ार',
    ar: 'السوق',
    pt: 'Mercado',
    bn: 'বাজার',
    es: 'Mercado',
    fr: 'Marché',
    ur: 'بازار'
  },
  howToStart: {
    ru: 'Как начать',
    en: 'How to Start',
    zh: '如何开始',
    hi: 'कैसे शुरू करें',
    ar: 'كيف تبدأ',
    pt: 'Como Começar',
    bn: 'কিভাবে শুরু করবেন',
    es: 'Cómo Empezar',
    fr: 'Comment Commencer',
    ur: 'کیسے شروع کریں'
  },
  connectWallet: {
    ru: 'Подключить кошелек',
    en: 'Connect Wallet',
    zh: '连接钱包',
    hi: 'वॉलेट कनेक्ट करें',
    ar: 'ربط المحفظة',
    pt: 'Conectar Carteira',
    bn: 'ওয়ালেট সংযুক্ত করুন',
    es: 'Conectar Billetera',
    fr: 'Connecter Portefeuille',
    ur: 'بٹوہ جوڑیں'
  },

  // Hero Section
  heroTitle: {
    ru: 'Будущее токенизации активов',
    en: 'The Future of Asset Tokenization',
    zh: '资产代币化的未来',
    hi: 'संपत्ति टोकनीकरण का भविष्य',
    ar: 'مستقبل ترميز الأصول',
    pt: 'O Futuro da Tokenização de Ativos',
    bn: 'সম্পদ টোকেনাইজেশনের ভবিষ্যত',
    es: 'El Futuro de la Tokenización de Activos',
    fr: 'L\'Avenir de la Tokenisation d\'Actifs',
    ur: 'اثاثے کی ٹوکنائزیشن کا مستقبل'
  },
  heroSubtitle: {
    ru: 'Децентрализованная платформа для токенизации недвижимости, товаров и других активов с автоматическим созданием трех уникальных токенов',
    en: 'Decentralized platform for tokenizing real estate, goods and other assets with automatic creation of three unique tokens',
    zh: '去中心化平台，用于房地产、商品和其他资产的代币化，自动创建三种独特代币',
    hi: 'रियल एस्टेट, वस्तुओं और अन्य संपत्तियों के टोकनीकरण के लिए विकेंद्रीकृत मंच',
    ar: 'منصة لامركزية لترميز العقارات والسلع والأصول الأخرى',
    pt: 'Plataforma descentralizada para tokenização de imóveis, bens e outros ativos',
    bn: 'রিয়েল এস্টেট, পণ্য এবং অন্যান্য সম্পদের টোকেনাইজেশনের জন্য বিকেন্দ্রীভূত প্ল্যাটফর্ম',
    es: 'Plataforma descentralizada para tokenización de bienes raíces, bienes y otros activos',
    fr: 'Plateforme décentralisée pour la tokenisation d\'immobilier, de biens et d\'autres actifs',
    ur: 'رئیل اسٹیٹ، اشیاء اور دیگر اثاثوں کی ٹوکنائزیشن کے لیے غیر مرکوزی پلیٹ فارم'
  },

  // Features Section
  futureEcosystem: {
    ru: 'Экосистема будущего',
    en: 'Future Ecosystem',
    zh: '未来生态系统',
    hi: 'भविष्य का पारिस्थितिकी तंत्र',
    ar: 'النظام البيئي المستقبلي',
    pt: 'Ecossistema Futuro',
    bn: 'ভবিষ্যতের ইকোসিস্টেম',
    es: 'Ecosistema Futuro',
    fr: 'Écosystème Futur',
    ur: 'مستقبل کا ماحولیاتی نظام'
  },
  futureEcosystemDesc: {
    ru: 'Полная экосистема для работы с токенизированными активами реального мира',
    en: 'Complete ecosystem for working with tokenized real-world assets',
    zh: '用于处理代币化现实世界资产的完整生态系统',
    hi: 'टोकनीकृत वास्तविक संसार की संपत्तियों के साथ काम करने के लिए पूर्ण पारिस्थितिकी तंत्र',
    ar: 'نظام بيئي كامل للعمل مع الأصول المرمزة في العالم الحقيقي',
    pt: 'Ecossistema completo para trabalhar com ativos tokenizados do mundo real',
    bn: 'টোকেনাইজড বাস্তব-বিশ্বের সম্পদের সাথে কাজ করার জন্য সম্পূর্ণ ইকোসিস্টেম',
    es: 'Ecosistema completo para trabajar con activos tokenizados del mundo real',
    fr: 'Écosystème complet pour travailler avec des actifs tokenisés du monde réel',
    ur: 'ٹوکنائزڈ حقیقی دنیا کے اثاثوں کے ساتھ کام کرنے کے لیے مکمل ماحولیاتی نظام'
  },
  
  // Feature items
  assetTokenization: {
    ru: 'Токенизация активов',
    en: 'Asset Tokenization',
    zh: '资产代币化',
    hi: 'संपत्ति टोकनीकरण',
    ar: 'ترميز الأصول',
    pt: 'Tokenização de Ativos',
    bn: 'সম্পদ টোকেনাইজেশন',
    es: 'Tokenización de Activos',
    fr: 'Tokenisation d\'Actifs',
    ur: 'اثاثے کی ٹوکنائزیشن'
  },
  assetTokenizationDesc: {
    ru: 'Преобразуйте любые активы в цифровые токены на блокчейне',
    en: 'Transform any assets into digital tokens on blockchain',
    zh: '将任何资产转换为区块链上的数字代币',
    hi: 'किसी भी संपत्ति को ब्लॉकचेन पर डिजिटल टोकन में बदलें',
    ar: 'حول أي أصول إلى رموز رقمية على البلوك تشين',
    pt: 'Transforme qualquer ativo em tokens digitais na blockchain',
    bn: 'যেকোনো সম্পদকে ব্লকচেইনে ডিজিটাল টোকেনে রূপান্তর করুন',
    es: 'Transforma cualquier activo en tokens digitales en blockchain',
    fr: 'Transformez tous les actifs en jetons numériques sur blockchain',
    ur: 'کسی بھی اثاثے کو بلاک چین پر ڈیجیٹل ٹوکن میں تبدیل کریں'
  },
  marketplaceDesc: {
    ru: 'Торгуйте токенизированными активами на децентрализованной бирже',
    en: 'Trade tokenized assets on decentralized exchange',
    zh: '在去中心化交易所交易代币化资产',
    hi: 'विकेंद्रीकृत एक्सचेंज पर टोकनीकृत संपत्तियों का व्यापार करें',
    ar: 'تداول الأصول المرمزة في البورصة اللامركزية',
    pt: 'Negocie ativos tokenizados em exchange descentralizada',
    bn: 'বিকেন্দ্রীভূত এক্সচেঞ্জে টোকেনাইজড সম্পদ ট্রেড করুন',
    es: 'Comercia activos tokenizados en intercambio descentralizado',
    fr: 'Échangez des actifs tokenisés sur une bourse décentralisée',
    ur: 'غیر مرکوزی ایکسچینج پر ٹوکنائزڈ اثاثوں کا تجارت کریں'
  },
  liquidityPools: {
    ru: 'Пулы ликвидности',
    en: 'Liquidity Pools',
    zh: '流动性池',
    hi: 'तरलता पूल',
    ar: 'مجمعات السيولة',
    pt: 'Pools de Liquidez',
    bn: 'লিকুইডিটি পুল',
    es: 'Pools de Liquidez',
    fr: 'Pools de Liquidité',
    ur: 'لکویڈیٹی پولز'
  },
  liquidityPoolsDesc: {
    ru: 'Обеспечивайте ликвидность и получайте доходность',
    en: 'Provide liquidity and earn returns',
    zh: '提供流动性并获得收益',
    hi: 'तरलता प्रदान करें और रिटर्न अर्जित करें',
    ar: 'قدم السيولة واكسب العوائد',
    pt: 'Forneça liquidez e obtenha retornos',
    bn: 'লিকুইডিটি প্রদান করুন এবং রিটার্ন অর্জন করুন',
    es: 'Proporciona liquidez y obtén retornos',
    fr: 'Fournissez de la liquidité et obtenez des rendements',
    ur: 'لکویڈیٹی فراہم کریں اور منافع حاصل کریں'
  },
  lending: {
    ru: 'Кредитование',
    en: 'Lending',
    zh: '借贷',
    hi: 'उधार देना',
    ar: 'الإقراض',
    pt: 'Empréstimos',
    bn: 'ঋণদান',
    es: 'Préstamos',
    fr: 'Prêts',
    ur: 'قرض دینا'
  },
  lendingDesc: {
    ru: 'Получайте кредиты под залог токенизированных активов',
    en: 'Get loans secured by tokenized assets',
    zh: '获得由代币化资产担保的贷款',
    hi: 'टोकनीकृत संपत्तियों द्वारा सुरक्षित ऋण प्राप्त करें',
    ar: 'احصل على قروض مضمونة بالأصول المرمزة',
    pt: 'Obtenha empréstimos garantidos por ativos tokenizados',
    bn: 'টোকেনাইজড সম্পদ দ্বারা নিরাপদ ঋণ পান',
    es: 'Obtén préstamos garantizados por activos tokenizados',
    fr: 'Obtenez des prêts garantis par des actifs tokenisés',
    ur: 'ٹوکنائزڈ اثاثوں سے محفوظ قرض حاصل کریں'
  },
  personalCabinet: {
    ru: 'Личный кабинет',
    en: 'Personal Cabinet',
    zh: '个人中心',
    hi: 'व्यक्तिगत कैबिनेट',
    ar: 'الخزانة الشخصية',
    pt: 'Gabinete Pessoal',
    bn: 'ব্যক্তিগত ক্যাবিনেট',
    es: 'Gabinete Personal',
    fr: 'Cabinet Personnel',
    ur: 'ذاتی کیبنٹ'
  },
  personalCabinetDesc: {
    ru: 'Управляйте своими активами и отслеживайте доходность',
    en: 'Manage your assets and track performance',
    zh: '管理您的资产并跟踪表现',
    hi: 'अपनी संपत्तियों का प्रबंधन करें और प्रदर्शन को ट्रैक करें',
    ar: 'إدارة أصولك وتتبع الأداء',
    pt: 'Gerencie seus ativos e acompanhe o desempenho',
    bn: 'আপনার সম্পদ পরিচালনা করুন এবং কর্মক্ষমতা ট্র্যাক করুন',
    es: 'Gestiona tus activos y rastrea el rendimiento',
    fr: 'Gérez vos actifs et suivez les performances',
    ur: 'اپنے اثاثوں کا انتظام کریں اور کارکردگی کو ٹریک کریں'
  },
  community: {
    ru: 'Сообщество',
    en: 'Community',
    zh: '社区',
    hi: 'समुदाय',
    ar: 'المجتمع',
    pt: 'Comunidade',
    bn: 'কমিউনিটি',
    es: 'Comunidad',
    fr: 'Communauté',
    ur: 'کمیونٹی'
  },
  communityDesc: {
    ru: 'Присоединяйтесь к сообществу инвесторов и трейдеров',
    en: 'Join the community of investors and traders',
    zh: '加入投资者和交易者社区',
    hi: 'निवेशकों और व्यापारियों के समुदाय में शामिल हों',
    ar: 'انضم إلى مجتمع المستثمرين والمتداولين',
    pt: 'Junte-se à comunidade de investidores e traders',
    bn: 'বিনিয়োগকারী এবং ট্রেডারদের কমিউনিটিতে যোগ দিন',
    es: 'Únete a la comunidad de inversores y traders',
    fr: 'Rejoignez la communauté d\'investisseurs et de traders',
    ur: 'سرمایہ کاروں اور تاجروں کی کمیونٹی میں شامل ہوں'
  },

  // Token System
  threeTokenSystem: {
    ru: 'Система трех токенов',
    en: 'Three Token System',
    zh: '三代币系统',
    hi: 'तीन टोकन सिस्टम',
    ar: 'نظام الثلاثة رموز',
    pt: 'Sistema de Três Tokens',
    bn: 'তিন টোকেন সিস্টেম',
    es: 'Sistema de Tres Tokens',
    fr: 'Système de Trois Jetons',
    ur: 'تین ٹوکن سسٹم'
  },
  stableTokensTitle: {
    ru: 'Стабильные токены',
    en: 'Stable Tokens',
    zh: '稳定代币',
    hi: 'स्थिर टोकन',
    ar: 'الرموز المستقرة',
    pt: 'Tokens Estáveis',
    bn: 'স্থিতিশীল টোকেন',
    es: 'Tokens Estables',
    fr: 'Jetons Stables',
    ur: 'مستحکم ٹوکن'
  },
  stableTokensDescription: {
    ru: 'Основная стоимость актива с минимальной волатильностью',
    en: 'Main asset value with minimal volatility',
    zh: '主要资产价值，波动性最小',
    hi: 'न्यूनतम अस्थिरता के साथ मुख्य संपत्ति मूल्य',
    ar: 'القيمة الأصلية الرئيسية مع تقلبات طفيفة',
    pt: 'Valor principal do ativo com volatilidade mínima',
    bn: 'ন্যূনতম অস্থিরতা সহ প্রধান সম্পদ মূল্য',
    es: 'Valor principal del activo con volatilidad mínima',
    fr: 'Valeur principale de l\'actif avec volatilité minimale',
    ur: 'کم سے کم اتار چڑھاؤ کے ساتھ اصل اثاثہ کی قیمت'
  },
  supportTokensTitle: {
    ru: 'Токены поддержки',
    en: 'Support Tokens',
    zh: '支持代币',
    hi: 'समर्थन टोकन',
    ar: 'رموز الدعم',
    pt: 'Tokens de Suporte',
    bn: 'সাপোর্ট টোকেন',
    es: 'Tokens de Soporte',
    fr: 'Jetons de Support',
    ur: 'سپورٹ ٹوکن'
  },
  supportTokensDescription: {
    ru: 'Обеспечивают ликвидность и стабильность системы',
    en: 'Provide liquidity and system stability',
    zh: '提供流动性和系统稳定性',
    hi: 'तरलता और सिस्टम स्थिरता प्रदान करते हैं',
    ar: 'توفر السيولة واستقرار النظام',
    pt: 'Fornecem liquidez e estabilidade do sistema',
    bn: 'লিকুইডিটি এবং সিস্টেমের স্থিতিশীলতা প্রদান করে',
    es: 'Proporcionan liquidez y estabilidad del sistema',
    fr: 'Fournissent la liquidité et la stabilité du système',
    ur: 'لکویڈیٹی اور سسٹم کی استحکام فراہم کرتے ہیں'
  },
  brandTokensTitle: {
    ru: 'Бренд токены',
    en: 'Brand Tokens',
    zh: '品牌代币',
    hi: 'ब्रांड टोकन',
    ar: 'رموز العلامة التجارية',
    pt: 'Tokens de Marca',
    bn: 'ব্র্যান্ড টোকেন',
    es: 'Tokens de Marca',
    fr: 'Jetons de Marque',
    ur: 'برانڈ ٹوکن'
  },
  brandTokensDescription: {
    ru: 'Эксклюзивные права и привилегии владельцев',
    en: 'Exclusive rights and owner privileges',
    zh: '专属权利和所有者特权',
    hi: 'विशेष अधिकार और मालिक विशेषाधिकार',
    ar: 'حقوق حصرية وامتيازات المالك',
    pt: 'Direitos exclusivos e privilégios do proprietário',
    bn: 'একচেটিয়া অধিকার এবং মালিক বিশেষাধিকার',
    es: 'Derechos exclusivos y privilegios del propietario',
    fr: 'Droits exclusifs et privilèges du propriétaire',
    ur: 'خصوصی حقوق اور مالک کے امتیازات'
  },

  // Popular Assets
  popularAssets: {
    ru: 'Популярные активы',
    en: 'Popular Assets',
    zh: '热门资产',
    hi: 'लोकप्रिय संपत्तियां',
    ar: 'الأصول الشائعة',
    pt: 'Ativos Populares',
    bn: 'জনপ্রিয় সম্পদ',
    es: 'Activos Populares',
    fr: 'Actifs Populaires',
    ur: 'مقبول اثاثے'
  },
  popularAssetsDesc: {
    ru: 'Изучите самые востребованные токенизированные активы на нашей платформе',
    en: 'Explore the most sought-after tokenized assets on our platform',
    zh: '探索我们平台上最受欢迎的代币化资产',
    hi: 'हमारे प्लेटफॉर्म पर सबसे अधिक मांग वाली टोकनीकृत संपत्तियों का अन्वेषण करें',
    ar: 'اكتشف الأصول المرمزة الأكثر طلباً على منصتنا',
    pt: 'Explore os ativos tokenizados mais procurados em nossa plataforma',
    bn: 'আমাদের প্ল্যাটফর্মে সবচেয়ে চাহিদাসম্পন্ন টোকেনাইজড সম্পদগুলি অন্বেষণ করুন',
    es: 'Explora los activos tokenizados más demandados en nuestra plataforma',
    fr: 'Explorez les actifs tokenisés les plus recherchés sur notre plateforme',
    ur: 'ہمارے پلیٹ فارم پر سب سے زیادہ مطلوبہ ٹوکنائزڈ اثاثوں کو دریافت کریں'
  },
  luxuryApartmentNYC: {
    ru: 'Роскошная квартира в Нью-Йорке',
    en: 'Luxury Apartment in NYC',
    zh: '纽约豪华公寓',
    hi: 'न्यूयॉर्क में लक्जरी अपार्टमेंट',
    ar: 'شقة فاخرة في نيويورك',
    pt: 'Apartamento de Luxo em NYC',
    bn: 'এনওয়াইসিতে বিলাসবহুল অ্যাপার্টমেন্ট',
    es: 'Apartamento de Lujo en NYC',
    fr: 'Appartement de Luxe à NYC',
    ur: 'NYC میں لگژری اپارٹمنٹ'
  },
  realEstate: {
    ru: 'Недвижимость',
    en: 'Real Estate',
    zh: '房地产',
    hi: 'रियल एस्टेट',
    ar: 'العقارات',
    pt: 'Imóveis',
    bn: 'রিয়েল এস্টেট',
    es: 'Bienes Raíces',
    fr: 'Immobilier',
    ur: 'رئیل اسٹیٹ'
  },
  newYorkUSA: {
    ru: 'Нью-Йорк, США',
    en: 'New York, USA',
    zh: '美国纽约',
    hi: 'न्यूयॉर्क, यूएसए',
    ar: 'نيويورك، الولايات المتحدة الأمريكية',
    pt: 'Nova York, EUA',
    bn: 'নিউ ইয়র্ক, যুক্তরাষ্ট্র',
    es: 'Nueva York, EE.UU.',
    fr: 'New York, États-Unis',
    ur: 'نیویارک، امریکہ'
  },
  commercialOfficeSpace: {
    ru: 'Коммерческое офисное помещение',
    en: 'Commercial Office Space',
    zh: '商业办公空间',
    hi: 'वाणिज्यिक कार्यालय स्थान',
    ar: 'مساحة مكتبية تجارية',
    pt: 'Espaço de Escritório Comercial',
    bn: 'বাণিজ্যিক অফিস স্পেস',
    es: 'Espacio de Oficina Comercial',
    fr: 'Espace de Bureau Commercial',
    ur: 'تجارتی دفتری جگہ'
  },
  commercialRealEstate: {
    ru: 'Коммерческая недвижимость',
    en: 'Commercial Real Estate',
    zh: '商业房地产',
    hi: 'वाणिज्यिक रियल एस्टेट',
    ar: 'العقارات التجارية',
    pt: 'Imóveis Comerciais',
    bn: 'বাণিজ্যিক রিয়েল এস্টেট',
    es: 'Bienes Raíces Comerciales',
    fr: 'Immobilier Commercial',
    ur: 'تجارتی رئیل اسٹیٹ'
  },
  londonUK: {
    ru: 'Лондон, Великобритания',
    en: 'London, UK',
    zh: '英国伦敦',
    hi: 'लंदन, यूके',
    ar: 'لندن، المملكة المتحدة',
    pt: 'Londres, Reino Unido',
    bn: 'লন্ডন, যুক্তরাজ্য',
    es: 'Londres, Reino Unido',
    fr: 'Londres, Royaume-Uni',
    ur: 'لندن، برطانیہ'
  },
  vintageWineCollection: {
    ru: 'Коллекция винтажных вин',
    en: 'Vintage Wine Collection',
    zh: '葡萄酒收藏',
    hi: 'विंटेज वाइन संग्रह',
    ar: 'مجموعة النبيذ العتيق',
    pt: 'Coleção de Vinhos Vintage',
    bn: 'ভিনটেজ ওয়াইন সংগ্রহ',
    es: 'Colección de Vinos Vintage',
    fr: 'Collection de Vins Vintage',
    ur: 'پرانی شراب کا مجموعہ'
  },
  goods: {
    ru: 'Товары',
    en: 'Goods',
    zh: '商品',
    hi: 'वस्तुएं',
    ar: 'السلع',
    pt: 'Bens',
    bn: 'পণ্য',
    es: 'Bienes',
    fr: 'Biens',
    ur: 'اشیاء'
  },
  bordeauxFrance: {
    ru: 'Бордо, Франция',
    en: 'Bordeaux, France',
    zh: '法国波尔多',
    hi: 'बोर्डो, फ्रांस',
    ar: 'بوردو، فرنسا',
    pt: 'Bordeaux, França',
    bn: 'বোর্দো, ফ্রান্স',
    es: 'Burdeos, Francia',
    fr: 'Bordeaux, France',
    ur: 'بورڈو، فرانس'
  },
  totalAssetValue: {
    ru: 'Общая стоимость актива',
    en: 'Total Asset Value',
    zh: '总资产价值',
    hi: 'कुल संपत्ति मूल्य',
    ar: 'إجمالي قيمة الأصل',
    pt: 'Valor Total do Ativo',
    bn: 'মোট সম্পদ মূল্য',
    es: 'Valor Total del Activo',
    fr: 'Valeur Totale de l\'Actif',
    ur: 'کل اثاثہ کی قیمت'
  },
  buy: {
    ru: 'Купить',
    en: 'Buy',
    zh: '购买',
    hi: 'खरीदें',
    ar: 'شراء',
    pt: 'Comprar',
    bn: 'কিনুন',
    es: 'Comprar',
    fr: 'Acheter',
    ur: 'خریدیں'
  },
  liquidity: {
    ru: 'Ликвидность',
    en: 'Liquidity',
    zh: '流动性',
    hi: 'तरलता',
    ar: 'السيولة',
    pt: 'Liquidez',
    bn: 'লিকুইডিটি',
    es: 'Liquidez',
    fr: 'Liquidité',
    ur: 'لکویڈیٹی'
  },
  openFullMarketplace: {
    ru: 'Открыть полный маркетплейс',
    en: 'Open Full Marketplace',
    zh: '打开完整市场',
    hi: 'पूरा मार्केटप्लेस खोलें',
    ar: 'افتح السوق الكامل',
    pt: 'Abrir Mercado Completo',
    bn: 'সম্পূর্ণ মার্কেটপ্লেস খুলুন',
    es: 'Abrir Mercado Completo',
    fr: 'Ouvrir le Marché Complet',
    ur: 'مکمل مارکیٹ پلیس کھولیں'
  },

  // Footer
  company: {
    ru: 'Компания',
    en: 'Company',
    zh: '公司',
    hi: 'कंपनी',
    ar: 'الشركة',
    pt: 'Empresa',
    bn: 'কোম্পানি',
    es: 'Empresa',
    fr: 'Entreprise',
    ur: 'کمپنی'
  },
  support: {
    ru: 'Поддержка',
    en: 'Support',
    zh: '支持',
    hi: 'सहायता',
    ar: 'الدعم',
    pt: 'Suporte',
    bn: 'সাপোর্ট',
    es: 'Soporte',
    fr: 'Support',
    ur: 'سپورٹ'
  },
  legal: {
    ru: 'Правовая информация',
    en: 'Legal',
    zh: '法律',
    hi: 'कानूनी',
    ar: 'قانوني',
    pt: 'Legal',
    bn: 'আইনি',
    es: 'Legal',
    fr: 'Légal',
    ur: 'قانونی'
  },
  privacyPolicy: {
    ru: 'Политика конфиденциальности',
    en: 'Privacy Policy',
    zh: '隐私政策',
    hi: 'गोपनीयता नीति',
    ar: 'سياسة الخصوصية',
    pt: 'Política de Privacidade',
    bn: 'গোপনীয়তা নীতি',
    es: 'Política de Privacidad',
    fr: 'Politique de Confidentialité',
    ur: 'رازداری کی پالیسی'
  },
  termsOfService: {
    ru: 'Условия использования',
    en: 'Terms of Service',
    zh: '服务条款',
    hi: 'सेवा की शर्तें',
    ar: 'شروط الخدمة',
    pt: 'Termos de Serviço',
    bn: 'সেবার শর্তাবলী',
    es: 'Términos de Servicio',
    fr: 'Conditions de Service',
    ur: 'سروس کی شرائط'
  },
  legalInfo: {
    ru: 'Правовая информация',
    en: 'Legal Information',
    zh: '法律信息',
    hi: 'कानूनी जानकारी',
    ar: 'المعلومات القانونية',
    pt: 'Informações Legais',
    bn: 'আইনি তথ্য',
    es: 'Información Legal',
    fr: 'Informations Légales',
    ur: 'قانونی معلومات'
  },
  allRightsReserved: {
    ru: '© 2025 Cosmo RWA. Все права защищены',
    en: '© 2025 Cosmo RWA. All rights reserved',
    zh: '© 2025 Cosmo RWA. 版权所有',
    hi: '© 2025 Cosmo RWA. सभी अधिकार सुरक्षित',
    ar: '© 2025 Cosmo RWA. جميع الحقوق محفوظة',
    pt: '© 2025 Cosmo RWA. Todos os direitos reservados',
    bn: '© 2025 Cosmo RWA. সকল অধিকার সংরক্ষিত',
    es: '© 2025 Cosmo RWA. Todos los derechos reservados',
    fr: '© 2025 Cosmo RWA. Tous droits réservés',
    ur: '© 2025 Cosmo RWA. تمام حقوق محفوظ'
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
