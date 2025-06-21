
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreateAsset = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assetType: '',
    valueUsd: '',
    location: '',
    imageUrl: ''
  });

  const assetTypes = [
    { value: 'real_estate', label: 'Недвижимость' },
    { value: 'goods', label: 'Товары' },
    { value: 'art', label: 'Искусство' },
    { value: 'collectibles', label: 'Коллекционные предметы' },
    { value: 'other', label: 'Другое' }
  ];

  const generateTokenId = (assetType: string, location: string, id: string, suffix: string) => {
    const typeMap: { [key: string]: string } = {
      'real_estate': 'RE',
      'goods': 'GD',
      'art': 'AR',
      'collectibles': 'CL',
      'other': 'OT'
    };
    
    const locationCode = location.slice(0, 2).toUpperCase();
    const assetTypeCode = typeMap[assetType] || 'OT';
    
    return `${assetTypeCode}_${locationCode}_${id}_${suffix}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      // Генерируем уникальный ID для актива
      const assetId = crypto.randomUUID();
      const shortId = assetId.slice(0, 8);

      // Генерируем ID токенов
      const astTokenId = generateTokenId(formData.assetType, formData.location, shortId, 'AST');
      const agtTokenId = generateTokenId(formData.assetType, formData.location, shortId, 'AGT');
      const abtTokenId = generateTokenId(formData.assetType, formData.location, shortId, 'ABT');

      // Рассчитываем цены токенов
      const totalValue = parseFloat(formData.valueUsd);
      const astPrice = (totalValue * 0.9) / 1000000000; // 90% / 1 млрд токенов
      const agtPrice = (totalValue * 0.09) / 1000000000; // 9% / 1 млрд токенов
      const abtPrice = (totalValue * 0.01) / 1000000000; // 1% / 1 млрд токенов

      // Создаем актив в базе данных
      const { error: assetError } = await supabase
        .from('assets')
        .insert({
          id: assetId,
          owner_id: user.id,
          name: formData.name,
          description: formData.description,
          asset_type: formData.assetType,
          value_usd: totalValue,
          location: formData.location,
          image_url: formData.imageUrl || null,
          ast_token_id: astTokenId,
          agt_token_id: agtTokenId,
          abt_token_id: abtTokenId,
          ast_price: astPrice,
          agt_price: agtPrice,
          abt_price: abtPrice
        });

      if (assetError) throw assetError;

      // Создаем пулы ликвидности для токенов
      const liquidityPools = [
        { asset_id: assetId, token_type: 'AST' },
        { asset_id: assetId, token_type: 'AGT' },
        { asset_id: assetId, token_type: 'ABT' }
      ];

      const { error: poolError } = await supabase
        .from('liquidity_pools')
        .insert(liquidityPools);

      if (poolError) throw poolError;

      // Записываем транзакцию создания актива
      await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          asset_id: assetId,
          transaction_type: 'create_asset',
          amount_cosmo: 0,
          amount_bnb: 0.001 // Комиссия за создание
        });

      toast({
        title: "Актив создан успешно!",
        description: `Созданы токены: ${astTokenId}, ${agtTokenId}, ${abtTokenId}`,
      });

      navigate('/marketplace');
    } catch (error: any) {
      toast({
        title: "Ошибка создания актива",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground digital-grid">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          В личный кабинет
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card className="asset-card">
            <CardHeader>
              <CardTitle className="gradient-text">Токенизация актива</CardTitle>
              <CardDescription>
                Создайте три уникальных токена для вашего актива: AST (90%), AGT (9%), ABT (1%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Название актива</label>
                  <Input
                    placeholder="Например: Квартира в центре Москвы"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Описание</label>
                  <Textarea
                    placeholder="Подробное описание актива..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Тип актива</label>
                  <Select value={formData.assetType} onValueChange={(value) => handleInputChange('assetType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип актива" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Стоимость (USD)</label>
                  <Input
                    type="number"
                    placeholder="100000"
                    value={formData.valueUsd}
                    onChange={(e) => handleInputChange('valueUsd', e.target.value)}
                    required
                    min="1"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Локация</label>
                  <Input
                    placeholder="Москва, Россия"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">URL изображения (опционально)</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={formData.imageUrl}
                      onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    />
                    <Button type="button" variant="outline" disabled>
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {formData.valueUsd && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Предварительный расчет токенов:</h3>
                    <div className="space-y-1 text-sm">
                      <div>AST (90%): {((parseFloat(formData.valueUsd) * 0.9) / 1000000000).toFixed(8)} COSMO за токен</div>
                      <div>AGT (9%): {((parseFloat(formData.valueUsd) * 0.09) / 1000000000).toFixed(8)} COSMO за токен</div>
                      <div>ABT (1%): {((parseFloat(formData.valueUsd) * 0.01) / 1000000000).toFixed(8)} COSMO за токен</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Лимит каждого токена: 1,000,000,000 штук
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full futuristic-btn" disabled={loading}>
                  {loading ? 'Создание актива...' : 'Создать актив'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateAsset;
