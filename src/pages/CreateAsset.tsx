
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from '@/hooks/useMetaMask';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

const CreateAsset = () => {
  const { account, isConnected } = useMetaMask();
  const { toast } = useToast();
  const { t } = useLanguage();
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

  // Если кошелек не подключен, показываем сообщение
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background text-foreground digital-grid flex items-center justify-center">
        <div className="text-center">
          <Wallet className="h-16 w-16 mx-auto mb-4 text-blue-400" />
          <h2 className="text-2xl font-bold mb-4">{t('connectMetaMask')}</h2>
          <p className="text-muted-foreground mb-6">
            {t('connectWalletToCreateAsset')}
          </p>
          <Button onClick={() => navigate('/')} className="futuristic-btn">
            {t('back')}
          </Button>
        </div>
      </div>
    );
  }

  const assetTypes = [
    { value: 'real_estate', label: t('realEstate') },
    { value: 'goods', label: t('goods') },
    { value: 'art', label: t('art') },
    { value: 'collectibles', label: t('collectibles') },
    { value: 'other', label: t('other') }
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
    if (!account) {
      toast({
        title: t('error'),
        description: t('connectWalletFirst'),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      console.log('Creating asset for account:', account);
      
      // Генерируем уникальный ID для актива
      const assetId = crypto.randomUUID();
      const shortId = assetId.slice(0, 8);

      // Генерируем ID токенов
      const astTokenId = generateTokenId(formData.assetType, formData.location, shortId, 'AST');
      const agtTokenId = generateTokenId(formData.assetType, formData.location, shortId, 'AGT');
      const abtTokenId = generateTokenId(formData.assetType, formData.location, shortId, 'ABT');

      // Рассчитываем цены токенов
      const totalValue = parseFloat(formData.valueUsd);
      const astPrice = (totalValue * 0.9) / 1000000000;
      const agtPrice = (totalValue * 0.09) / 1000000000;
      const abtPrice = (totalValue * 0.01) / 1000000000;

      // Создаем актив в базе данных
      const { error: assetError } = await supabase
        .from('assets')
        .insert({
          id: assetId,
          owner_id: account, // Используем wallet address как owner_id
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

      if (assetError) {
        console.error('Error creating asset:', assetError);
        throw assetError;
      }

      // Создаем пулы ликвидности для токенов
      const liquidityPools = [
        { asset_id: assetId, token_type: 'AST' },
        { asset_id: assetId, token_type: 'AGT' },
        { asset_id: assetId, token_type: 'ABT' }
      ];

      const { error: poolError } = await supabase
        .from('liquidity_pools')
        .insert(liquidityPools);

      if (poolError) {
        console.error('Error creating liquidity pools:', poolError);
        throw poolError;
      }

      // Записываем транзакцию создания актива
      await supabase
        .from('transactions')
        .insert({
          user_id: account,
          asset_id: assetId,
          transaction_type: 'create_asset',
          amount_cosmo: 0,
          amount_bnb: 0.001 // Комиссия за создание
        });

      toast({
        title: t('success'),
        description: `${t('assetCreatedSuccessfully')}: ${astTokenId}, ${agtTokenId}, ${abtTokenId}`,
      });

      navigate('/marketplace');
    } catch (error: any) {
      console.error('Error creating asset:', error);
      toast({
        title: t('assetCreationError'),
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
          {t('backToDashboard')}
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card className="asset-card">
            <CardHeader>
              <CardTitle className="gradient-text">{t('assetTokenization')}</CardTitle>
              <CardDescription>
                {t('assetTokenizationDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('assetName')}</label>
                  <Input
                    placeholder={t('assetNamePlaceholder')}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('assetDescription')}</label>
                  <Textarea
                    placeholder={t('assetDescriptionPlaceholder')}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('assetType')}</label>
                  <Select value={formData.assetType} onValueChange={(value) => handleInputChange('assetType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectAssetType')} />
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
                  <label className="block text-sm font-medium mb-2">{t('assetValue')}</label>
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
                  <label className="block text-sm font-medium mb-2">{t('location')}</label>
                  <Input
                    placeholder={t('locationPlaceholder')}
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('imageUrlOptional')}</label>
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
                    <h3 className="font-semibold mb-2">{t('tokenCalculationPreview')}:</h3>
                    <div className="space-y-1 text-sm">
                      <div>AST (90%): {((parseFloat(formData.valueUsd) * 0.9) / 1000000000).toFixed(8)} COSMO {t('perToken')}</div>
                      <div>AGT (9%): {((parseFloat(formData.valueUsd) * 0.09) / 1000000000).toFixed(8)} COSMO {t('perToken')}</div>
                      <div>ABT (1%): {((parseFloat(formData.valueUsd) * 0.01) / 1000000000).toFixed(8)} COSMO {t('perToken')}</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t('tokenLimitInfo')}
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full futuristic-btn" disabled={loading}>
                  {loading ? t('creatingAsset') : t('createAsset')}
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
