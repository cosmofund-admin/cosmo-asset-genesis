
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, ShoppingCart, TrendingUp, Coins, Banknote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Asset {
  id: string;
  name: string;
  description: string;
  asset_type: string;
  value_usd: number;
  location: string;
  image_url?: string;
  ast_token_id: string;
  agt_token_id: string;
  abt_token_id: string;
  ast_price: number;
  agt_price: number;
  abt_price: number;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setAssets(data);
    }
    setLoading(false);
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || asset.asset_type === typeFilter;
    const matchesLocation = !locationFilter || asset.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const getAssetTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'real_estate': 'Недвижимость',
      'goods': 'Товары',
      'art': 'Искусство',
      'collectibles': 'Коллекционные предметы',
      'other': 'Другое'
    };
    return typeMap[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground digital-grid flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 neon-glow mx-auto mb-4 animate-pulse"></div>
          <p>Загрузка маркетплейса...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground digital-grid">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Маркетплейс</h1>
              <p className="text-muted-foreground">Торговля токенизированными активами</p>
            </div>
          </div>
          <Button className="futuristic-btn" onClick={() => navigate('/create-asset')}>
            Создать актив
          </Button>
        </div>

        {/* Фильтры */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск активов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Тип актива" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="real_estate">Недвижимость</SelectItem>
              <SelectItem value="goods">Товары</SelectItem>
              <SelectItem value="art">Искусство</SelectItem>
              <SelectItem value="collectibles">Коллекционные предметы</SelectItem>
              <SelectItem value="other">Другое</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Локация..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Новые</SelectItem>
              <SelectItem value="price_high">Цена: по убыванию</SelectItem>
              <SelectItem value="price_low">Цена: по возрастанию</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Список активов */}
        {filteredAssets.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">Активы не найдены</h3>
            <p className="text-muted-foreground mb-4">
              {assets.length === 0 ? 'В маркетплейсе пока нет активов' : 'Попробуйте изменить фильтры поиска'}
            </p>
            <Button className="futuristic-btn" onClick={() => navigate('/create-asset')}>
              Создать первый актив
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className="asset-card hover:border-blue-500/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">{getAssetTypeLabel(asset.asset_type)}</Badge>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Стоимость</div>
                      <div className="font-bold text-green-400">${asset.value_usd.toLocaleString()}</div>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{asset.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{asset.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    📍 {asset.location}
                  </div>

                  {/* Информация о токенах */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Цены токенов
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-blue-500/10 rounded">
                        <div className="font-semibold text-blue-400">AST</div>
                        <div>{asset.ast_price?.toFixed(8)} COSMO</div>
                      </div>
                      <div className="text-center p-2 bg-purple-500/10 rounded">
                        <div className="font-semibold text-purple-400">AGT</div>
                        <div>{asset.agt_price?.toFixed(8)} COSMO</div>
                      </div>
                      <div className="text-center p-2 bg-green-500/10 rounded">
                        <div className="font-semibold text-green-400">ABT</div>
                        <div>{asset.abt_price?.toFixed(8)} COSMO</div>
                      </div>
                    </div>
                  </div>

                  {/* Кнопки действий */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      className="futuristic-btn"
                      onClick={() => navigate(`/asset/${asset.id}`)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Купить
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/asset/${asset.id}/liquidity`)}
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Ликвидность
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/asset/${asset.id}/sell`)}
                    >
                      <Banknote className="h-4 w-4 mr-1" />
                      Продать
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/asset/${asset.id}/collateral`)}
                    >
                      <Coins className="h-4 w-4 mr-1" />
                      Заложить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
