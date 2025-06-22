
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, TrendingUp, DollarSign, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const QuickActions = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const actions = [
    {
      title: t('createAsset'),
      description: t('tokenizeYourAsset'),
      icon: <Plus className="h-6 w-6" />,
      color: 'text-blue-400',
      action: () => navigate('/create-asset')
    },
    {
      title: t('marketplace'),
      description: t('tradeAssetTokens'),
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-green-400',
      action: () => navigate('/marketplace')
    },
    {
      title: t('loans'),
      description: t('loansWithTokenCollateral'),
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-purple-400',
      action: () => navigate('/loans')
    },
    {
      title: t('defiSwap'),
      description: t('exchangeTokens'),
      icon: <Coins className="h-6 w-6" />,
      color: 'text-orange-400',
      action: () => navigate('/marketplace') // Временно ведем на маркетплейс
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold gradient-text mb-6">{t('quickActions')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Card key={index} className="asset-card cursor-pointer hover:scale-105 transition-transform" onClick={action.action}>
            <CardHeader className="pb-3">
              <div className={`${action.color} mb-2`}>
                {action.icon}
              </div>
              <CardTitle className="text-lg">{action.title}</CardTitle>
              <CardDescription className="text-sm">
                {action.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                {action.title === t('createAsset') ? t('startTokenization') : t('open')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
