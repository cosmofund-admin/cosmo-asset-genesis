import React, { createContext, useContext, ReactNode } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'ru' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ja' | 'ko' | 'zh';

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    features: 'Features',
    howToStart: 'How to Start',
    about: 'About',
    marketplace: 'Marketplace',
    dashboard: 'Dashboard',
    login: 'Login',
    logout: 'Logout',
    
    // Hero Section
    tokenizeRealAssets: 'Tokenize',
    realAssets: 'Real Assets',
    heroSubtitle: 'Transform physical assets into digital tokens with blockchain technology',
    tokenLimitPerAsset: 'Token limit per asset',
    stableTokens: 'Stable tokens',
    assetTrading: 'Asset trading',
    startTokenization: 'Start Tokenization',
    exploreMarketplace: 'Explore Marketplace',
    
    // Features
    highLiquidity: 'High Liquidity',
    highLiquidityDesc: 'Trade asset tokens anytime with guaranteed liquidity',
    security: 'Security',
    securityDesc: 'Blockchain protection and smart contract verification',
    tripleTokenization: 'Triple Tokenization',
    tripleTokenizationDesc: 'Three types of tokens for maximum flexibility',
    
    // Ecosystem
    futureEcosystem: 'Future Ecosystem',
    futureEcosystemDesc: 'Complete infrastructure for real asset tokenization',
    assetTokenization: 'Asset Tokenization',
    assetTokenizationDesc: 'Convert real assets into blockchain tokens',
    marketplaceDesc: 'Trade tokenized assets on decentralized exchange',
    liquidityPools: 'Liquidity Pools',
    liquidityPoolsDesc: 'Provide liquidity and earn rewards',
    lending: 'Lending',
    lendingDesc: 'Collateralize tokens for loans',
    personalCabinet: 'Personal Cabinet',
    personalCabinetDesc: 'Manage your assets and transactions',
    community: 'Community',
    communityDesc: 'Join the tokenization community',
    
    // Token System
    threeTokenSystem: 'Three Token System',
    stableTokensTitle: 'Stable Tokens',
    stableTokensDescription: 'Main asset tokens with stable value',
    supportTokensTitle: 'Support Tokens',
    supportTokensDescription: 'Utility tokens for ecosystem services',
    brandTokensTitle: 'Brand Tokens',
    brandTokensDescription: 'Exclusive tokens for brand recognition',
    
    // How to Start
    howToStartTitle: 'How to Start',
    howToStartDescription: 'Simple steps to begin asset tokenization',
    step1Title: 'Connect Wallet',
    step1Description: 'Connect your crypto wallet to the platform',
    step2Title: 'Add Assets',
    step2Description: 'Upload information about your assets',
    step3Title: 'Tokenize',
    step3Description: 'Create tokens for your assets',
    step4Title: 'Trade',
    step4Description: 'Start trading on the marketplace',
    
    // About
    aboutTitle: 'About Cosmo RWA',
    aboutDescription: 'Revolutionary platform for real asset tokenization',
    missionTitle: 'Our Mission',
    missionDescription: 'We democratize access to real assets through blockchain technology',
    featuresTitle: 'Key Features',
    feature1: 'Blockchain Security',
    feature2: 'Global Accessibility',
    feature3: 'Instant Transactions',
    feature4: 'Community Governance',
    
    // Dashboard
    myAssets: 'My Assets',
    tokens: 'Tokens',
    transactions: 'Transactions',
    totalRevenue: 'Total Revenue',
    balance: 'Balance',
    cosmoBalance: 'COSMO Balance',
    bnbBalance: 'BNB Balance',
    totalValue: 'Total Value',
    quickActions: 'Quick Actions',
    createAsset: 'Create Asset',
    tokenizeYourAsset: 'Tokenize your asset',
    tradeAssetTokens: 'Trade asset tokens',
    loans: 'Loans',
    loansWithTokenCollateral: 'Loans with token collateral',
    defiSwap: 'DeFi Swap',
    exchangeTokens: 'Exchange tokens',
    open: 'Open',
    transactionHistory: 'Transaction History',
    noTransactionsToDisplay: 'No transactions to display',
    type: 'Type',
    cosmoAmount: 'COSMO Amount',
    asset: 'Asset',
    date: 'Date',
    assetId: 'Asset ID',
    
    // Popular Assets
    popularAssets: 'Popular Assets',
    price: 'Price',
    change24h: '24h Change',
    volume: 'Volume',
    marketCap: 'Market Cap',
    realEstate: 'Real Estate',
    commodities: 'Commodities',
    art: 'Art',
    
    // Footer
    platformDescription: 'Revolutionary platform for tokenizing real-world assets on the blockchain',
    product: 'Product',
    tokenization: 'Tokenization',
    liquidity: 'Liquidity',
    supportSection: 'Support',
    documentation: 'Documentation',
    faq: 'FAQ',
    support: 'Support',
    company: 'Company',
    aboutUs: 'About Us',
    team: 'Team',
    careers: 'Careers',
    blog: 'Blog',
    copyright: '© 2024 Cosmo RWA. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    legalInformation: 'Legal Information'
  },
  
  ru: {
    // Navigation
    home: 'Главная',
    features: 'Возможности',
    howToStart: 'Как начать',
    about: 'О нас',
    marketplace: 'Маркетплейс',
    dashboard: 'Панель управления',
    login: 'Войти',
    logout: 'Выйти',
    
    // Hero Section
    tokenizeRealAssets: 'Токенизируйте',
    realAssets: 'Реальные активы',
    heroSubtitle: 'Превращайте физические активы в цифровые токены с помощью блокчейн технологий',
    tokenLimitPerAsset: 'Лимит токенов на актив',
    stableTokens: 'Стабильные токены',
    assetTrading: 'Торговля активами',
    startTokenization: 'Начать токенизацию',
    exploreMarketplace: 'Изучить маркетплейс',
    
    // Features
    highLiquidity: 'Высокая ликвидность',
    highLiquidityDesc: 'Торгуйте токенами активов в любое время с гарантированной ликвидностью',
    security: 'Безопасность',
    securityDesc: 'Защита блокчейна и верификация смарт-контрактов',
    tripleTokenization: 'Тройная токенизация',
    tripleTokenizationDesc: 'Три типа токенов для максимальной гибкости',
    
    // Ecosystem
    futureEcosystem: 'Экосистема будущего',
    futureEcosystemDesc: 'Полная инфраструктура для токенизации реальных активов',
    assetTokenization: 'Токенизация активов',
    assetTokenizationDesc: 'Превращайте реальные активы в блокчейн токены',
    marketplaceDesc: 'Торгуйте токенизированными активами на децентрализованной бирже',
    liquidityPools: 'Пулы ликвидности',
    liquidityPoolsDesc: 'Предоставляйте ликвидность и получайте вознаграждения',
    lending: 'Кредитование',
    lendingDesc: 'Используйте токены как залог для кредитов',
    personalCabinet: 'Личный кабинет',
    personalCabinetDesc: 'Управляйте своими активами и транзакциями',
    community: 'Сообщество',
    communityDesc: 'Присоединяйтесь к сообществу токенизации',
    
    // Token System
    threeTokenSystem: 'Система трех токенов',
    stableTokensTitle: 'Стабильные токены',
    stableTokensDescription: 'Основные токены активов со стабильной стоимостью',
    supportTokensTitle: 'Поддерживающие токены',
    supportTokensDescription: 'Утилитарные токены для услуг экосистемы',
    brandTokensTitle: 'Брендовые токены',
    brandTokensDescription: 'Эксклюзивные токены для узнаваемости бренда',
    
    // How to Start
    howToStartTitle: 'Как начать',
    howToStartDescription: 'Простые шаги для начала токенизации активов',
    step1Title: 'Подключить кошелек',
    step1Description: 'Подключите свой криптокошелек к платформе',
    step2Title: 'Добавить активы',
    step2Description: 'Загрузите информацию о ваших активах',
    step3Title: 'Токенизировать',
    step3Description: 'Создайте токены для ваших активов',
    step4Title: 'Торговать',
    step4Description: 'Начните торговать на маркетплейсе',
    
    // About
    aboutTitle: 'О Cosmo RWA',
    aboutDescription: 'Революционная платформа для токенизации реальных активов',
    missionTitle: 'Наша миссия',
    missionDescription: 'Мы демократизируем доступ к реальным активам через блокчейн технологии',
    featuresTitle: 'Ключевые особенности',
    feature1: 'Безопасность блокчейна',
    feature2: 'Глобальная доступность',
    feature3: 'Мгновенные транзакции',
    feature4: 'Управление сообществом',
    
    // Dashboard
    myAssets: 'Мои активы',
    tokens: 'Токены',
    transactions: 'Транзакции',
    totalRevenue: 'Общий доход',
    balance: 'Баланс',
    cosmoBalance: 'Баланс COSMO',
    bnbBalance: 'Баланс BNB',
    totalValue: 'Общая стоимость',
    quickActions: 'Быстрые действия',
    createAsset: 'Создать актив',
    tokenizeYourAsset: 'Токенизировать ваш актив',
    tradeAssetTokens: 'Торговать токенами активов',
    loans: 'Кредиты',
    loansWithTokenCollateral: 'Кредиты под залог токенов',
    defiSwap: 'DeFi обмен',
    exchangeTokens: 'Обменять токены',
    open: 'Открыть',
    transactionHistory: 'История транзакций',
    noTransactionsToDisplay: 'Нет транзакций для отображения',
    type: 'Тип',
    cosmoAmount: 'Количество COSMO',
    asset: 'Актив',
    date: 'Дата',
    assetId: 'ID актива',
    
    // Popular Assets
    popularAssets: 'Популярные активы',
    price: 'Цена',
    change24h: 'Изменение за 24ч',
    volume: 'Объем',
    marketCap: 'Рыночная капитализация',
    realEstate: 'Недвижимость',
    commodities: 'Сырьевые товары',
    art: 'Искусство',
    
    // Footer
    platformDescription: 'Революционная платформа для токенизации реальных активов на блокчейне',
    product: 'Продукт',
    tokenization: 'Токенизация',
    liquidity: 'Ликвидность',
    supportSection: 'Поддержка',
    documentation: 'Документация',
    faq: 'Часто задаваемые вопросы',
    support: 'Поддержка',
    company: 'Компания',
    aboutUs: 'О нас',
    team: 'Команда',
    careers: 'Карьера',
    blog: 'Блог',
    copyright: '© 2024 Cosmo RWA. Все права защищены.',
    privacyPolicy: 'Политика конфиденциальности',
    termsOfUse: 'Условия использования',
    legalInformation: 'Правовая информация'
  },
  
  es: {
    // Navigation
    home: 'Inicio',
    features: 'Características',
    howToStart: 'Cómo empezar',
    about: 'Acerca de',
    marketplace: 'Mercado',
    dashboard: 'Panel',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    
    // Hero Section
    tokenizeRealAssets: 'Tokenizar',
    realAssets: 'Activos reales',
    heroSubtitle: 'Transforma activos físicos en tokens digitales con tecnología blockchain',
    tokenLimitPerAsset: 'Límite de tokens por activo',
    stableTokens: 'Tokens estables',
    assetTrading: 'Comercio de activos',
    startTokenization: 'Comenzar tokenización',
    exploreMarketplace: 'Explorar mercado',
    
    // Features
    highLiquidity: 'Alta liquidez',
    highLiquidityDesc: 'Comercia tokens de activos en cualquier momento con liquidez garantizada',
    security: 'Seguridad',
    securityDesc: 'Protección blockchain y verificación de contratos inteligentes',
    tripleTokenization: 'Triple tokenización',
    tripleTokenizationDesc: 'Tres tipos de tokens para máxima flexibilidad',
    
    // Ecosystem
    futureEcosystem: 'Ecosistema futuro',
    futureEcosystemDesc: 'Infraestructura completa para tokenización de activos reales',
    assetTokenization: 'Tokenización de activos',
    assetTokenizationDesc: 'Convierte activos reales en tokens blockchain',
    marketplaceDesc: 'Comercia activos tokenizados en intercambio descentralizado',
    liquidityPools: 'Pools de liquidez',
    liquidityPoolsDesc: 'Proporciona liquidez y gana recompensas',
    lending: 'Préstamos',
    lendingDesc: 'Usa tokens como garantía para préstamos',
    personalCabinet: 'Gabinete personal',
    personalCabinetDesc: 'Gestiona tus activos y transacciones',
    community: 'Comunidad',
    communityDesc: 'Únete a la comunidad de tokenización',
    
    // Token System
    threeTokenSystem: 'Sistema de tres tokens',
    stableTokensTitle: 'Tokens estables',
    stableTokensDescription: 'Tokens principales de activos con valor estable',
    supportTokensTitle: 'Tokens de apoyo',
    supportTokensDescription: 'Tokens utilitarios para servicios del ecosistema',
    brandTokensTitle: 'Tokens de marca',
    brandTokensDescription: 'Tokens exclusivos para reconocimiento de marca',
    
    // How to Start
    howToStartTitle: 'Cómo empezar',
    howToStartDescription: 'Pasos simples para comenzar la tokenización de activos',
    step1Title: 'Conectar billetera',
    step1Description: 'Conecta tu billetera cripto a la plataforma',
    step2Title: 'Agregar activos',
    step2Description: 'Sube información sobre tus activos',
    step3Title: 'Tokenizar',
    step3Description: 'Crea tokens para tus activos',
    step4Title: 'Comerciar',
    step4Description: 'Comienza a comerciar en el mercado',
    
    // About
    aboutTitle: 'Acerca de Cosmo RWA',
    aboutDescription: 'Plataforma revolucionaria para tokenización de activos reales',
    missionTitle: 'Nuestra misión',
    missionDescription: 'Democratizamos el acceso a activos reales a través de tecnología blockchain',
    featuresTitle: 'Características clave',
    feature1: 'Seguridad blockchain',
    feature2: 'Accesibilidad global',
    feature3: 'Transacciones instantáneas',
    feature4: 'Gobernanza comunitaria',
    
    // Dashboard
    myAssets: 'Mis activos',
    tokens: 'Tokens',
    transactions: 'Transacciones',
    totalRevenue: 'Ingresos totales',
    balance: 'Balance',
    cosmoBalance: 'Balance COSMO',
    bnbBalance: 'Balance BNB',
    totalValue: 'Valor total',
    quickActions: 'Acciones rápidas',
    createAsset: 'Crear activo',
    tokenizeYourAsset: 'Tokenizar tu activo',
    tradeAssetTokens: 'Comerciar tokens de activos',
    loans: 'Préstamos',
    loansWithTokenCollateral: 'Préstamos con garantía de tokens',
    defiSwap: 'Intercambio DeFi',
    exchangeTokens: 'Intercambiar tokens',
    open: 'Abrir',
    transactionHistory: 'Historial de transacciones',
    noTransactionsToDisplay: 'No hay transacciones para mostrar',
    type: 'Tipo',
    cosmoAmount: 'Cantidad COSMO',
    asset: 'Activo',
    date: 'Fecha',
    assetId: 'ID del activo',
    
    // Popular Assets
    popularAssets: 'Activos populares',
    price: 'Precio',
    change24h: 'Cambio 24h',
    volume: 'Volumen',
    marketCap: 'Capitalización de mercado',
    realEstate: 'Bienes raíces',
    commodities: 'Materias primas',
    art: 'Arte',
    
    // Footer
    platformDescription: 'Plataforma revolucionaria para tokenizar activos del mundo real en blockchain',
    product: 'Producto',
    tokenization: 'Tokenización',
    liquidity: 'Liquidez',
    supportSection: 'Soporte',
    documentation: 'Documentación',
    faq: 'Preguntas frecuentes',
    support: 'Soporte',
    company: 'Empresa',
    aboutUs: 'Acerca de nosotros',
    team: 'Equipo',
    careers: 'Carreras',
    blog: 'Blog',
    copyright: '© 2024 Cosmo RWA. Todos los derechos reservados.',
    privacyPolicy: 'Política de privacidad',
    termsOfUse: 'Términos de uso',
    legalInformation: 'Información legal'
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    features: 'Fonctionnalités',
    howToStart: 'Comment commencer',
    about: 'À propos',
    marketplace: 'Marché',
    dashboard: 'Tableau de bord',
    login: 'Se connecter',
    logout: 'Se déconnecter',
    
    // Hero Section
    tokenizeRealAssets: 'Tokeniser',
    realAssets: 'Actifs réels',
    heroSubtitle: 'Transformez les actifs physiques en tokens numériques avec la technologie blockchain',
    tokenLimitPerAsset: 'Limite de tokens par actif',
    stableTokens: 'Tokens stables',
    assetTrading: 'Trading d\'actifs',
    startTokenization: 'Commencer la tokenisation',
    exploreMarketplace: 'Explorer le marché',
    
    // Features
    highLiquidity: 'Haute liquidité',
    highLiquidityDesc: 'Échangez des tokens d\'actifs à tout moment avec une liquidité garantie',
    security: 'Sécurité',
    securityDesc: 'Protection blockchain et vérification des contrats intelligents',
    tripleTokenization: 'Triple tokenisation',
    tripleTokenizationDesc: 'Trois types de tokens pour une flexibilité maximale',
    
    // Ecosystem
    futureEcosystem: 'Écosystème futur',
    futureEcosystemDesc: 'Infrastructure complète pour la tokenisation d\'actifs réels',
    assetTokenization: 'Tokenisation d\'actifs',
    assetTokenizationDesc: 'Convertissez les actifs réels en tokens blockchain',
    marketplaceDesc: 'Échangez des actifs tokenisés sur un échange décentralisé',
    liquidityPools: 'Pools de liquidité',
    liquidityPoolsDesc: 'Fournissez de la liquidité et gagnez des récompenses',
    lending: 'Prêts',
    lendingDesc: 'Utilisez des tokens comme garantie pour des prêts',
    personalCabinet: 'Cabinet personnel',
    personalCabinetDesc: 'Gérez vos actifs et transactions',
    community: 'Communauté',
    communityDesc: 'Rejoignez la communauté de tokenisation',
    
    // Token System
    threeTokenSystem: 'Système à trois tokens',
    stableTokensTitle: 'Tokens stables',
    stableTokensDescription: 'Tokens d\'actifs principaux avec valeur stable',
    supportTokensTitle: 'Tokens de support',
    supportTokensDescription: 'Tokens utilitaires pour les services de l\'écosystème',
    brandTokensTitle: 'Tokens de marque',
    brandTokensDescription: 'Tokens exclusifs pour la reconnaissance de marque',
    
    // How to Start
    howToStartTitle: 'Comment commencer',
    howToStartDescription: 'Étapes simples pour commencer la tokenisation d\'actifs',
    step1Title: 'Connecter le portefeuille',
    step1Description: 'Connectez votre portefeuille crypto à la plateforme',
    step2Title: 'Ajouter des actifs',
    step2Description: 'Téléchargez des informations sur vos actifs',
    step3Title: 'Tokeniser',
    step3Description: 'Créez des tokens pour vos actifs',
    step4Title: 'Échanger',
    step4Description: 'Commencez à échanger sur le marché',
    
    // About
    aboutTitle: 'À propos de Cosmo RWA',
    aboutDescription: 'Plateforme révolutionnaire pour la tokenisation d\'actifs réels',
    missionTitle: 'Notre mission',
    missionDescription: 'Nous démocratisons l\'accès aux actifs réels grâce à la technologie blockchain',
    featuresTitle: 'Fonctionnalités clés',
    feature1: 'Sécurité blockchain',
    feature2: 'Accessibilité mondiale',
    feature3: 'Transactions instantanées',
    feature4: 'Gouvernance communautaire',
    
    // Dashboard
    myAssets: 'Mes actifs',
    tokens: 'Tokens',
    transactions: 'Transactions',
    totalRevenue: 'Revenus totaux',
    balance: 'Solde',
    cosmoBalance: 'Solde COSMO',
    bnbBalance: 'Solde BNB',
    totalValue: 'Valeur totale',
    quickActions: 'Actions rapides',
    createAsset: 'Créer un actif',
    tokenizeYourAsset: 'Tokeniser votre actif',
    tradeAssetTokens: 'Échanger des tokens d\'actifs',
    loans: 'Prêts',
    loansWithTokenCollateral: 'Prêts avec garantie de tokens',
    defiSwap: 'Échange DeFi',
    exchangeTokens: 'Échanger des tokens',
    open: 'Ouvrir',
    transactionHistory: 'Historique des transactions',
    noTransactionsToDisplay: 'Aucune transaction à afficher',
    type: 'Type',
    cosmoAmount: 'Montant COSMO',
    asset: 'Actif',
    date: 'Date',
    assetId: 'ID de l\'actif',
    
    // Popular Assets
    popularAssets: 'Actifs populaires',
    price: 'Prix',
    change24h: 'Changement 24h',
    volume: 'Volume',
    marketCap: 'Capitalisation boursière',
    realEstate: 'Immobilier',
    commodities: 'Matières premières',
    art: 'Art',
    
    // Footer
    platformDescription: 'Plateforme révolutionnaire pour tokeniser les actifs du monde réel sur blockchain',
    product: 'Produit',
    tokenization: 'Tokenisation',
    liquidity: 'Liquidité',
    supportSection: 'Support',
    documentation: 'Documentation',
    faq: 'FAQ',
    support: 'Support',
    company: 'Entreprise',
    aboutUs: 'À propos de nous',
    team: 'Équipe',
    careers: 'Carrières',
    blog: 'Blog',
    copyright: '© 2024 Cosmo RWA. Tous droits réservés.',
    privacyPolicy: 'Politique de confidentialité',
    termsOfUse: 'Conditions d\'utilisation',
    legalInformation: 'Informations légales'
  },
  
  de: {
    // Navigation
    home: 'Startseite',
    features: 'Funktionen',
    howToStart: 'Wie anfangen',
    about: 'Über uns',
    marketplace: 'Marktplatz',
    dashboard: 'Dashboard',
    login: 'Anmelden',
    logout: 'Abmelden',
    
    // Hero Section
    tokenizeRealAssets: 'Tokenisieren',
    realAssets: 'Reale Vermögenswerte',
    heroSubtitle: 'Verwandeln Sie physische Vermögenswerte in digitale Token mit Blockchain-Technologie',
    tokenLimitPerAsset: 'Token-Limit pro Vermögenswert',
    stableTokens: 'Stabile Token',
    assetTrading: 'Vermögenswerte-Handel',
    startTokenization: 'Tokenisierung starten',
    exploreMarketplace: 'Marktplatz erkunden',
    
    // Features
    highLiquidity: 'Hohe Liquidität',
    highLiquidityDesc: 'Handeln Sie Vermögenswerte-Token jederzeit mit garantierter Liquidität',
    security: 'Sicherheit',
    securityDesc: 'Blockchain-Schutz und Smart-Contract-Verifizierung',
    tripleTokenization: 'Dreifache Tokenisierung',
    tripleTokenizationDesc: 'Drei Token-Arten für maximale Flexibilität',
    
    // Ecosystem
    futureEcosystem: 'Zukunfts-Ökosystem',
    futureEcosystemDesc: 'Komplette Infrastruktur für die Tokenisierung realer Vermögenswerte',
    assetTokenization: 'Vermögenswerte-Tokenisierung',
    assetTokenizationDesc: 'Verwandeln Sie reale Vermögenswerte in Blockchain-Token',
    marketplaceDesc: 'Handeln Sie tokenisierte Vermögenswerte auf dezentraler Börse',
    liquidityPools: 'Liquiditätspools',
    liquidityPoolsDesc: 'Stellen Sie Liquidität bereit und verdienen Sie Belohnungen',
    lending: 'Kreditvergabe',
    lendingDesc: 'Verwenden Sie Token als Sicherheit für Kredite',
    personalCabinet: 'Persönliches Kabinett',
    personalCabinetDesc: 'Verwalten Sie Ihre Vermögenswerte und Transaktionen',
    community: 'Gemeinschaft',
    communityDesc: 'Treten Sie der Tokenisierungs-Gemeinschaft bei',
    
    // Token System
    threeTokenSystem: 'Drei-Token-System',
    stableTokensTitle: 'Stabile Token',
    stableTokensDescription: 'Haupt-Vermögenswerte-Token mit stabilem Wert',
    supportTokensTitle: 'Unterstützungs-Token',
    supportTokensDescription: 'Utility-Token für Ökosystem-Services',
    brandTokensTitle: 'Marken-Token',
    brandTokensDescription: 'Exklusive Token für Markenerkennung',
    
    // How to Start
    howToStartTitle: 'Wie anfangen',
    howToStartDescription: 'Einfache Schritte zum Beginn der Vermögenswerte-Tokenisierung',
    step1Title: 'Wallet verbinden',
    step1Description: 'Verbinden Sie Ihre Krypto-Wallet mit der Plattform',
    step2Title: 'Vermögenswerte hinzufügen',
    step2Description: 'Laden Sie Informationen über Ihre Vermögenswerte hoch',
    step3Title: 'Tokenisieren',
    step3Description: 'Erstellen Sie Token für Ihre Vermögenswerte',
    step4Title: 'Handeln',
    step4Description: 'Beginnen Sie den Handel auf dem Marktplatz',
    
    // About
    aboutTitle: 'Über Cosmo RWA',
    aboutDescription: 'Revolutionäre Plattform für die Tokenisierung realer Vermögenswerte',
    missionTitle: 'Unsere Mission',
    missionDescription: 'Wir demokratisieren den Zugang zu realen Vermögenswerten durch Blockchain-Technologie',
    featuresTitle: 'Hauptmerkmale',
    feature1: 'Blockchain-Sicherheit',
    feature2: 'Globale Zugänglichkeit',
    feature3: 'Sofortige Transaktionen',
    feature4: 'Gemeinschafts-Governance',
    
    // Dashboard
    myAssets: 'Meine Vermögenswerte',
    tokens: 'Token',
    transactions: 'Transaktionen',
    totalRevenue: 'Gesamteinnahmen',
    balance: 'Guthaben',
    cosmoBalance: 'COSMO-Guthaben',
    bnbBalance: 'BNB-Guthaben',
    totalValue: 'Gesamtwert',
    quickActions: 'Schnelle Aktionen',
    createAsset: 'Vermögenswert erstellen',
    tokenizeYourAsset: 'Ihren Vermögenswert tokenisieren',
    tradeAssetTokens: 'Vermögenswerte-Token handeln',
    loans: 'Kredite',
    loansWithTokenCollateral: 'Kredite mit Token-Sicherheit',
    defiSwap: 'DeFi-Tausch',
    exchangeTokens: 'Token tauschen',
    open: 'Öffnen',
    transactionHistory: 'Transaktionshistorie',
    noTransactionsToDisplay: 'Keine Transaktionen zum Anzeigen',
    type: 'Typ',
    cosmoAmount: 'COSMO-Betrag',
    asset: 'Vermögenswert',
    date: 'Datum',
    assetId: 'Vermögenswert-ID',
    
    // Popular Assets
    popularAssets: 'Beliebte Vermögenswerte',
    price: 'Preis',
    change24h: '24h-Änderung',
    volume: 'Volumen',
    marketCap: 'Marktkapitalisierung',
    realEstate: 'Immobilien',
    commodities: 'Rohstoffe',
    art: 'Kunst',
    
    // Footer
    platformDescription: 'Revolutionäre Plattform zur Tokenisierung realer Vermögenswerte auf der Blockchain',
    product: 'Produkt',
    tokenization: 'Tokenisierung',
    liquidity: 'Liquidität',
    supportSection: 'Support',
    documentation: 'Dokumentation',
    faq: 'FAQ',
    support: 'Support',
    company: 'Unternehmen',
    aboutUs: 'Über uns',
    team: 'Team',
    careers: 'Karriere',
    blog: 'Blog',
    copyright: '© 2024 Cosmo RWA. Alle Rechte vorbehalten.',
    privacyPolicy: 'Datenschutzrichtlinie',
    termsOfUse: 'Nutzungsbedingungen',
    legalInformation: 'Rechtliche Informationen'
  },
  
  it: {
    // Navigation
    home: 'Home',
    features: 'Caratteristiche',
    howToStart: 'Come iniziare',
    about: 'Chi siamo',
    marketplace: 'Mercato',
    dashboard: 'Dashboard',
    login: 'Accedi',
    logout: 'Esci',
    
    // Hero Section
    tokenizeRealAssets: 'Tokenizza',
    realAssets: 'Asset reali',
    heroSubtitle: 'Trasforma asset fisici in token digitali con la tecnologia blockchain',
    tokenLimitPerAsset: 'Limite token per asset',
    stableTokens: 'Token stabili',
    assetTrading: 'Trading di asset',
    startTokenization: 'Inizia tokenizzazione',
    exploreMarketplace: 'Esplora mercato',
    
    // Features
    highLiquidity: 'Alta liquidità',
    highLiquidityDesc: 'Scambia token di asset in qualsiasi momento con liquidità garantita',
    security: 'Sicurezza',
    securityDesc: 'Protezione blockchain e verifica smart contract',
    tripleTokenization: 'Tripla tokenizzazione',
    tripleTokenizationDesc: 'Tre tipi di token per massima flessibilità',
    
    // Ecosystem
    futureEcosystem: 'Ecosistema futuro',
    futureEcosystemDesc: 'Infrastruttura completa per la tokenizzazione di asset reali',
    assetTokenization: 'Tokenizzazione asset',
    assetTokenizationDesc: 'Converti asset reali in token blockchain',
    marketplaceDesc: 'Scambia asset tokenizzati su exchange decentralizzato',
    liquidityPools: 'Pool di liquidità',
    liquidityPoolsDesc: 'Fornisci liquidità e guadagna ricompense',
    lending: 'Prestiti',
    lendingDesc: 'Usa token come garanzia per prestiti',
    personalCabinet: 'Gabinetto personale',
    personalCabinetDesc: 'Gestisci i tuoi asset e transazioni',
    community: 'Comunità',
    communityDesc: 'Unisciti alla comunità di tokenizzazione',
    
    // Token System
    threeTokenSystem: 'Sistema a tre token',
    stableTokensTitle: 'Token stabili',
    stableTokensDescription: 'Token di asset principali con valore stabile',
    supportTokensTitle: 'Token di supporto',
    supportTokensDescription: 'Token utilitari per servizi dell\'ecosistema',
    brandTokensTitle: 'Token di marca',
    brandTokensDescription: 'Token esclusivi per riconoscimento del marchio',
    
    // How to Start
    howToStartTitle: 'Come iniziare',
    howToStartDescription: 'Passaggi semplici per iniziare la tokenizzazione di asset',
    step1Title: 'Connetti wallet',
    step1Description: 'Connetti il tuo wallet crypto alla piattaforma',
    step2Title: 'Aggiungi asset',
    step2Description: 'Carica informazioni sui tuoi asset',
    step3Title: 'Tokenizza',
    step3Description: 'Crea token per i tuoi asset',
    step4Title: 'Scambia',
    step4Description: 'Inizia a scambiare sul mercato',
    
    // About
    aboutTitle: 'Su Cosmo RWA',
    aboutDescription: 'Piattaforma rivoluzionaria per la tokenizzazione di asset reali',
    missionTitle: 'La nostra missione',
    missionDescription: 'Democratizziamo l\'accesso agli asset reali attraverso la tecnologia blockchain',
    featuresTitle: 'Caratteristiche principali',
    feature1: 'Sicurezza blockchain',
    feature2: 'Accessibilità globale',
    feature3: 'Transazioni istantanee',
    feature4: 'Governance della comunità',
    
    // Dashboard
    myAssets: 'I miei asset',
    tokens: 'Token',
    transactions: 'Transazioni',
    totalRevenue: 'Ricavi totali',
    balance: 'Saldo',
    cosmoBalance: 'Saldo COSMO',
    bnbBalance: 'Saldo BNB',
    totalValue: 'Valore totale',
    quickActions: 'Azioni rapide',
    createAsset: 'Crea asset',
    tokenizeYourAsset: 'Tokenizza il tuo asset',
    tradeAssetTokens: 'Scambia token di asset',
    loans: 'Prestiti',
    loansWithTokenCollateral: 'Prestiti con garanzia token',
    defiSwap: 'Scambio DeFi',
    exchangeTokens: 'Scambia token',
    open: 'Apri',
    transactionHistory: 'Cronologia transazioni',
    noTransactionsToDisplay: 'Nessuna transazione da mostrare',
    type: 'Tipo',
    cosmoAmount: 'Importo COSMO',
    asset: 'Asset',
    date: 'Data',
    assetId: 'ID Asset',
    
    // Popular Assets
    popularAssets: 'Asset popolari',
    price: 'Prezzo',
    change24h: 'Variazione 24h',
    volume: 'Volume',
    marketCap: 'Capitalizzazione di mercato',
    realEstate: 'Immobiliare',
    commodities: 'Materie prime',
    art: 'Arte',
    
    // Footer
    platformDescription: 'Piattaforma rivoluzionaria per tokenizzare asset del mondo reale su blockchain',
    product: 'Prodotto',
    tokenization: 'Tokenizzazione',
    liquidity: 'Liquidità',
    supportSection: 'Supporto',
    documentation: 'Documentazione',
    faq: 'FAQ',
    support: 'Supporto',
    company: 'Azienda',
    aboutUs: 'Chi siamo',
    team: 'Team',
    careers: 'Carriere',
    blog: 'Blog',
    copyright: '© 2024 Cosmo RWA. Tutti i diritti riservati.',
    privacyPolicy: 'Politica sulla privacy',
    termsOfUse: 'Termini di utilizzo',
    legalInformation: 'Informazioni legali'
  },
  
  pt: {
    // Navigation
    home: 'Início',
    features: 'Recursos',
    howToStart: 'Como começar',
    about: 'Sobre',
    marketplace: 'Mercado',
    dashboard: 'Painel',
    login: 'Entrar',
    logout: 'Sair',
    
    // Hero Section
    tokenizeRealAssets: 'Tokenizar',
    realAssets: 'Ativos reais',
    heroSubtitle: 'Transforme ativos físicos em tokens digitais com tecnologia blockchain',
    tokenLimitPerAsset: 'Limite de tokens por ativo',
    stableTokens: 'Tokens estáveis',
    assetTrading: 'Negociação de ativos',
    startTokenization: 'Iniciar tokenização',
    exploreMarketplace: 'Explorar mercado',
    
    // Features
    highLiquidity: 'Alta liquidez',
    highLiquidityDesc: 'Negocie tokens de ativos a qualquer momento com liquidez garantida',
    security: 'Segurança',
    securityDesc: 'Proteção blockchain e verificação de contratos inteligentes',
    tripleTokenization: 'Tripla tokenização',
    tripleTokenizationDesc: 'Três tipos de tokens para máxima flexibilidade',
    
    // Ecosystem
    futureEcosystem: 'Ecossistema futuro',
    futureEcosystemDesc: 'Infraestrutura completa para tokenização de ativos reais',
    assetTokenization: 'Tokenização de ativos',
    assetTokenizationDesc: 'Converta ativos reais em tokens blockchain',
    marketplaceDesc: 'Negocie ativos tokenizados em exchange descentralizada',
    liquidityPools: 'Pools de liquidez',
    liquidityPoolsDesc: 'Forneça liquidez e ganhe recompensas',
    lending: 'Empréstimos',
    lendingDesc: 'Use tokens como garantia para empréstimos',
    personalCabinet: 'Gabinete pessoal',
    personalCabinetDesc: 'Gerencie seus ativos e transações',
    community: 'Comunidade',
    communityDesc: 'Junte-se à comunidade de tokenização',
    
    // Token System
    threeTokenSystem: 'Sistema de três tokens',
    stableTokensTitle: 'Tokens estáveis',
    stableTokensDescription: 'Tokens de ativos principais com valor estável',
    supportTokensTitle: 'Tokens de suporte',
    supportTokensDescription: 'Tokens utilitários para serviços do ecossistema',
    brandTokensTitle: 'Tokens de marca',
    brandTokensDescription: 'Tokens exclusivos para reconhecimento de marca',
    
    // How to Start
    howToStartTitle: 'Como começar',
    howToStartDescription: 'Passos simples para iniciar a tokenização de ativos',
    step1Title: 'Conectar carteira',
    step1Description: 'Conecte sua carteira crypto à plataforma',
    step2Title: 'Adicionar ativos',
    step2Description: 'Carregue informações sobre seus ativos',
    step3Title: 'Tokenizar',
    step3Description: 'Crie tokens para seus ativos',
    step4Title: 'Negociar',
    step4Description: 'Comece a negociar no mercado',
    
    // About
    aboutTitle: 'Sobre Cosmo RWA',
    aboutDescription: 'Plataforma revolucionária para tokenização de ativos reais',
    missionTitle: 'Nossa missão',
    missionDescription: 'Democratizamos o acesso a ativos reais através da tecnologia blockchain',
    featuresTitle: 'Recursos principais',
    feature1: 'Segurança blockchain',
    feature2: 'Acessibilidade global',
    feature3: 'Transações instantâneas',
    feature4: 'Governança da comunidade',
    
    // Dashboard
    myAssets: 'Meus ativos',
    tokens: 'Tokens',
    transactions: 'Transações',
    totalRevenue: 'Receita total',
    balance: 'Saldo',
    cosmoBalance: 'Saldo COSMO',
    bnbBalance: 'Saldo BNB',
    totalValue: 'Valor total',
    quickActions: 'Ações rápidas',
    createAsset: 'Criar ativo',
    tokenizeYourAsset: 'Tokenizar seu ativo',
    tradeAssetTokens: 'Negociar tokens de ativos',
    loans: 'Empréstimos',
    loansWithTokenCollateral: 'Empréstimos com garantia de tokens',
    defiSwap: 'Troca DeFi',
    exchangeTokens: 'Trocar tokens',
    open: 'Abrir',
    transactionHistory: 'Histórico de transações',
    noTransactionsToDisplay: 'Nenhuma transação para exibir',
    type: 'Tipo',
    cosmoAmount: 'Quantidade COSMO',
    asset: 'Ativo',
    date: 'Data',
    assetId: 'ID do Ativo',
    
    // Popular Assets
    popularAssets: 'Ativos populares',
    price: 'Preço',
    change24h: 'Mudança 24h',
    volume: 'Volume',
    marketCap: 'Capitalização de mercado',
    realEstate: 'Imóveis',
    commodities: 'Commodities',
    art: 'Arte',
    
    // Footer
    platformDescription: 'Plataforma revolucionária para tokenizar ativos do mundo real em blockchain',
    product: 'Produto',
    tokenization: 'Tokenização',
    liquidity: 'Liquidez',
    supportSection: 'Suporte',
    documentation: 'Documentação',
    faq: 'FAQ',
    support: 'Suporte',
    company: 'Empresa',
    aboutUs: 'Sobre nós',
    team: 'Equipe',
    careers: 'Carreiras',
    blog: 'Blog',
    copyright: '© 2024 Cosmo RWA. Todos os direitos reservados.',
    privacyPolicy: 'Política de privacidade',
    termsOfUse: 'Termos de uso',
    legalInformation: 'Informações legais'
  },
  
  ja: {
    // Navigation
    home: 'ホーム',
    features: '機能',
    howToStart: '始め方',
    about: '概要',
    marketplace: 'マーケット',
    dashboard: 'ダッシュボード',
    login: 'ログイン',
    logout: 'ログアウト',
    
    // Hero Section
    tokenizeRealAssets: 'トークン化',
    realAssets: '実物資産',
    heroSubtitle: 'ブロックチェーン技術で物理的資産をデジタルトークンに変換',
    tokenLimitPerAsset: '資産あたりのトークン制限',
    stableTokens: '安定トークン',
    assetTrading: '資産取引',
    startTokenization: 'トークン化を開始',
    exploreMarketplace: 'マーケットを探索',
    
    // Features
    highLiquidity: '高い流動性',
    highLiquidityDesc: '保証された流動性でいつでも資産トークンを取引',
    security: 'セキュリティ',
    securityDesc: 'ブロックチェーン保護とスマートコントラクト検証',
    tripleTokenization: 'トリプルトークン化',
    tripleTokenizationDesc: '最大の柔軟性のための3種類のトークン',
    
    // Ecosystem
    futureEcosystem: '未来のエコシステム',
    futureEcosystemDesc: '実物資産トークン化を実現するための完全なインフラ',
    assetTokenization: '資産トークン化',
    assetTokenizationDesc: '実物資産をブロックチェーントークンに変換',
    marketplaceDesc: '分散型取引所でトークン化された資産を取引',
    liquidityPools: '流動性プール',
    liquidityPoolsDesc: '流動性を提供して報酬を獲得',
    lending: 'レンディング',
    lendingDesc: 'ローンの担保としてトークンを使用',
    personalCabinet: '個人キャビネット',
    personalCabinetDesc: '資産と取引を管理',
    community: 'コミュニティ',
    communityDesc: 'トークン化コミュニティに参加',
    
    // Token System
    threeTokenSystem: '3トークンシステム',
    stableTokensTitle: '安定トークン',
    stableTokensDescription: '安定した価値を持つメイン資産トークン',
    supportTokensTitle: 'サポートトークン',
    supportTokensDescription: 'エコシステムサービスのためのユーティリティトークン',
    brandTokensTitle: 'ブランドトークン',
    brandTokensDescription: 'ブランド認知のための専用トークン',
    
    // How to Start
    howToStartTitle: '始め方',
    howToStartDescription: '資産トークン化を始めるための簡単なステップ',
    step1Title: 'ウォレット接続',
    step1Description: 'クリプトウォレットをプラットフォームに接続',
    step2Title: '資産追加',
    step2Description: '資産情報をアップロード',
    step3Title: 'トークン化',
    step3Description: '資産のトークンを作成',
    step4Title: '取引',
    step4Description: 'マーケットプレイスで取引開始',
    
    // About
    aboutTitle: 'Cosmo RWAについて',
    aboutDescription: '実物資産トークン化のための革新的プラットフォーム',
    missionTitle: '私たちのミッション',
    missionDescription: 'ブロックチェーン技術を通じて実物資産へのアクセスを民主化',
    featuresTitle: '主要機能',
    feature1: 'ブロックチェーンセキュリティ',
    feature2: 'グローバルアクセス',
    feature3: 'インスタント取引',
    feature4: 'コミュニティガバナンス',
    
    // Dashboard
    myAssets: '私の資産',
    tokens: 'トークン',
    transactions: '取引',
    totalRevenue: '総収益',
    balance: '残高',
    cosmoBalance: 'COSMO残高',
    bnbBalance: 'BNB残高',
    totalValue: '総価値',
    quickActions: 'クイックアクション',
    createAsset: '資産作成',
    tokenizeYourAsset: '資産をトークン化',
    tradeAssetTokens: '資産トークンを取引',
    loans: 'ローン',
    loansWithTokenCollateral: 'トークン担保ローン',
    defiSwap: 'DeFiスワップ',
    exchangeTokens: 'トークン交換',
    open: '開く',
    transactionHistory: '取引履歴',
    noTransactionsToDisplay: '表示する取引がありません',
    type: 'タイプ',
    cosmoAmount: 'COSMO数量',
    asset: '資産',
    date: '日付',
    assetId: '資産ID',
    
    // Popular Assets
    popularAssets: '人気資産',
    price: '価格',
    change24h: '24時間変動',
    volume: '出来高',
    marketCap: '時価総額',
    realEstate: '不動産',
    commodities: 'コモディティ',
    art: 'アート',
    
    // Footer
    platformDescription: 'ブロックチェーン上で実世界の資産をトークン化するための革新的プラットフォーム',
    product: '製品',
    tokenization: 'トークン化',
    liquidity: '流動性',
    supportSection: 'サポート',
    documentation: 'ドキュメント',
    faq: 'よくある質問',
    support: 'サポート',
    company: '会社',
    aboutUs: '私たちについて',
    team: 'チーム',
    careers: 'キャリア',
    blog: 'ブログ',
    copyright: '© 2024 Cosmo RWA. 全著作権所有。',
    privacyPolicy: 'プライバシーポリシー',
    termsOfUse: '利用規約',
    legalInformation: '法的情報'
  },
  
  ko: {
    // Navigation
    home: '홈',
    features: '기능',
    howToStart: '시작하기',
    about: '소개',
    marketplace: '마켓플레이스',
    dashboard: '대시보드',
    login: '로그인',
    logout: '로그아웃',
    
    // Hero Section
    tokenizeRealAssets: '토큰화',
    realAssets: '실물 자산',
    heroSubtitle: '블록체인 기술로 물리적 자산을 디지털 토큰으로 변환',
    tokenLimitPerAsset: '자산당 토큰 한도',
    stableTokens: '안정 토큰',
    assetTrading: '자산 거래',
    startTokenization: '토큰화 시작',
    exploreMarketplace: '마켓플레이스 탐색',
    
    // Features
    highLiquidity: '높은 유동성',
    highLiquidityDesc: '보장된 유동성으로 언제든지 자산 토큰 거래',
    security: '보안',
    securityDesc: '블록체인 보호 및 스마트 계약 검증',
    tripleTokenization: '삼중 토큰화',
    tripleTokenizationDesc: '최대 유연성을 위한 세 가지 토큰 유형',
    
    // Ecosystem
    futureEcosystem: '미래 생태계',
    futureEcosystemDesc: '실물 자산 토큰화를 위한 완전한 인프라',
    assetTokenization: '자산 토큰화',
    assetTokenizationDesc: '실물 자산을 블록체인 토큰으로 변환',
    marketplaceDesc: '탈중앙화 거래소에서 토큰화된 자산 거래',
    liquidityPools: '유동성 풀',
    liquidityPoolsDesc: '유동성을 제공하고 보상을 받으세요',
    lending: '대출',
    lendingDesc: '대출 담보로 토큰 사용',
    personalCabinet: '개인 캐비닛',
    personalCabinetDesc: '자산과 거래를 관리',
    community: '커뮤니티',
    communityDesc: '토큰화 커뮤니티에 참여',
    
    // Token System
    threeTokenSystem: '3토큰 시스템',
    stableTokensTitle: '안정 토큰',
    stableTokensDescription: '안정적인 가치를 가진 주요 자산 토큰',
    supportTokensTitle: '지원 토큰',
    supportTokensDescription: '생태계 서비스를 위한 유틸리티 토큰',
    brandTokensTitle: '브랜드 토큰',
    brandTokensDescription: '브랜드 인식을 위한 독점 토큰',
    
    // How to Start
    howToStartTitle: '시작하기',
    howToStartDescription: '자산 토큰화를 시작하는 간단한 단계',
    step1Title: '지갑 연결',
    step1Description: '플랫폼에 암호화폐 지갑 연결',
    step2Title: '자산 추가',
    step2Description: '자산 정보 업로드',
    step3Title: '토큰화',
    step3Description: '자산용 토큰 생성',
    step4Title: '거래',
    step4Description: '마켓플레이스에서 거래 시작',
    
    // About
    aboutTitle: 'Cosmo RWA 소개',
    aboutDescription: '실물 자산 토큰화를 위한 혁신적 플랫폼',
    missionTitle: '우리의 미션',
    missionDescription: '블록체인 기술을 통해 실물 자산에 대한 접근을 민주화',
    featuresTitle: '주요 기능',
    feature1: '블록체인 보안',
    feature2: '글로벌 접근성',
    feature3: '즉시 거래',
    feature4: '커뮤니티 거버넌스',
    
    // Dashboard
    myAssets: '내 자산',
    tokens: '토큰',
    transactions: '거래',
    totalRevenue: '총 수익',
    balance: '잔액',
    cosmoBalance: 'COSMO 잔액',
    bnbBalance: 'BNB 잔액',
    totalValue: '총 가치',
    quickActions: '빠른 실행',
    createAsset: '자산 생성',
    tokenizeYourAsset: '자산 토큰화',
    tradeAssetTokens: '자산 토큰 거래',
    loans: '대출',
    loansWithTokenCollateral: '토큰 담보 대출',
    defiSwap: 'DeFi 스왑',
    exchangeTokens: '토큰 교환',
    open: '열기',
    transactionHistory: '거래 내역',
    noTransactionsToDisplay: '표시할 거래가 없습니다',
    type: '유형',
    cosmoAmount: 'COSMO 금액',
    asset: '자산',
    date: '날짜',
    assetId: '자산 ID',
    
    // Popular Assets
    popularAssets: '인기 자산',
    price: '가격',
    change24h: '24시간 변동',
    volume: '거래량',
    marketCap: '시가총액',
    realEstate: '부동산',
    commodities: '원자재',
    art: '예술',
    
    // Footer
    platformDescription: '블록체인에서 실제 자산을 토큰화하는 혁신적인 플랫폼',
    product: '제품',
    tokenization: '토큰화',
    liquidity: '유동성',
    supportSection: '지원',
    documentation: '문서',
    faq: '자주 묻는 질문',
    support: '지원',
    company: '회사',
    aboutUs: '회사 소개',
    team: '팀',
    careers: '채용',
    blog: '블로그',
    copyright: '© 2024 Cosmo RWA. 모든 권리 보유.',
    privacyPolicy: '개인정보 보호정책',
    termsOfUse: '이용 약관',
    legalInformation: '법적 정보'
  },
  
  zh: {
    // Navigation
    home: '首页',
    features: '功能',
    howToStart: '如何开始',
    about: '关于',
    marketplace: '市场',
    dashboard: '仪表板',
    login: '登录',
    logout: '退出',
    
    // Hero Section
    tokenizeRealAssets: '代币化',
    realAssets: '实物资产',
    heroSubtitle: '使用区块链技术将实物资产转换为数字代币',
    tokenLimitPerAsset: '每个资产的代币限制',
    stableTokens: '稳定代币',
    assetTrading: '资产交易',
    startTokenization: '开始代币化',
    exploreMarketplace: '探索市场',
    
    // Features
    highLiquidity: '高流动性',
    highLiquidityDesc: '随时交易资产代币，保证流动性',
    security: '安全',
    securityDesc: '区块链保护和智能合约验证',
    tripleTokenization: '三重代币化',
    tripleTokenizationDesc: '三种代币类型提供最大灵活性',
    
    // Ecosystem
    futureEcosystem: '未来生态系统',
    futureEcosystemDesc: '实物资产代币化的完整基础设施',
    assetTokenization: '资产代币化',
    assetTokenizationDesc: '将实物资产转换为区块链代币',
    marketplaceDesc: '在去中心化交易所交易代币化资产',
    liquidityPools: '流动性池',
    liquidityPoolsDesc: '提供流动性并获得奖励',
    lending: '借贷',
    lendingDesc: '使用代币作为贷款抵押品',
    personalCabinet: '个人面板',
    personalCabinetDesc: '管理您的资产和交易',
    community: '社区',
    communityDesc: '加入代币化社区',
    
    // Token System
    threeTokenSystem: '三代币系统',
    stableTokensTitle: '稳定代币',
    stableTokensDescription: '具有稳定价值的主要资产代币',
    supportTokensTitle: '支持代币',
    supportTokensDescription: '生态系统服务的实用代币',
    brandTokensTitle: '品牌代币',
    brandTokensDescription: '品牌识别的专属代币',
    
    // How to Start
    howToStartTitle: '如何开始',
    howToStartDescription: '开始资产代币化的简单步骤',
    step1Title: '连接钱包',
    step1Description: '将您的加密钱包连接到平台',
    step2Title: '添加资产',
    step2Description: '上传您的资产信息',
    step3Title: '代币化',
    step3Description: '为您的资产创建代币',
    step4Title: '交易',
    step4Description: '在市场上开始交易',
    
    // About
    aboutTitle: '关于Cosmo RWA',
    aboutDescription: '实物资产代币化的革命性平台',
    missionTitle: '我们的使命',
    missionDescription: '通过区块链技术民主化实物资产的获取',
    featuresTitle: '主要功能',
    feature1: '区块链安全',
    feature2: '全球可访问性',
    feature3: '即时交易',
    feature4: '社区治理',
    
    // Dashboard
    myAssets: '我的资产',
    tokens: '代币',
    transactions: '交易',
    totalRevenue: '总收入',
    balance: '余额',
    cosmoBalance: 'COSMO余额',
    bnbBalance: 'BNB余额',
    totalValue: '总价值',
    quickActions: '快速操作',
    createAsset: '创建资产',
    tokenizeYourAsset: '代币化您的资产',
    tradeAssetTokens: '交易资产代币',
    loans: '贷款',
    loansWithTokenCollateral: '代币抵押贷款',
    defiSwap: 'DeFi交换',
    exchangeTokens: '交换代币',
    open: '打开',
    transactionHistory: '交易历史',
    noTransactionsToDisplay: '没有交易可显示',
    type: '类型',
    cosmoAmount: 'COSMO数量',
    asset: '资产',
    date: '日期',
    assetId: '资产ID',
    
    // Popular Assets
    popularAssets: '热门资产',
    price: '价格',
    change24h: '24小时变化',
    volume: '交易量',
    marketCap: '市值',
    realEstate: '房地产',
    commodities: '商品',
    art: '艺术品',
    
    // Footer
    platformDescription: '在区块链上代币化现实世界资产的革命性平台',
    product: '产品',
    tokenization: '代币化',
    liquidity: '流动性',
    supportSection: '支持',
    documentation: '文档',
    faq: '常见问题',
    support: '支持',
    company: '公司',
    aboutUs: '关于我们',
    team: '团队',
    careers: '职业',
    blog: '博客',
    copyright: '© 2024 Cosmo RWA. 保留所有权利。',
    privacyPolicy: '隐私政策',
    termsOfUse: '使用条款',
    legalInformation: '法律信息'
  }
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'ru',
      setLanguage: (language) => set({ currentLanguage: language }),
    }),
    {
      name: 'language-storage',
    }
  )
);

// Language Context
const LanguageContext = createContext<{
  language: Language;
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
} | null>(null);

// Language Provider Component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const t = (key: string): string => {
    console.log(`Translating key: ${key} for language: ${currentLanguage}`);
    const translation = translations[currentLanguage]?.[key];
    
    if (!translation) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{
      language: currentLanguage, // For backward compatibility
      currentLanguage,
      setLanguage,
      t,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
