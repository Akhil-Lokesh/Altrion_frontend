import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button, Header, Card } from '../../components/ui';
import { useAssetDetail } from '../../hooks';
import { CONTAINER_VARIANTS, ITEM_VARIANTS, ROUTES } from '../../constants';
import type { ChartPeriod } from '../../utils';

// Import sub-components
import { AssetHero } from './components/AssetHero';
import { AssetPriceChart } from './components/AssetPriceChart';
import { PlatformHoldingsAccordion } from './components/PlatformHoldingsAccordion';
import { MarketStatsCard } from './components/MarketStatsCard';
import { AssetActionButtons } from './components/AssetActionButtons';

export function AssetDetail() {
  const navigate = useNavigate();
  const { symbol } = useParams<{ symbol: string }>();
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('24H');

  // Fetch asset data
  const { asset, error } = useAssetDetail(symbol || '');

  // Error state - asset not found
  if (error || !asset) {
    return (
      <div className="min-h-screen bg-dark-bg relative">
        <Header />
        <main className="max-w-7xl mx-auto px-5 py-6">
          <motion.div
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={ITEM_VARIANTS}>
              <Button variant="secondary" onClick={() => navigate(ROUTES.DASHBOARD)}>
                <ArrowLeft size={18} />
                Back to Dashboard
              </Button>
            </motion.div>

            <motion.div variants={ITEM_VARIANTS}>
              <Card variant="bordered" className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">?</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
                  Asset Not Found
                </h2>
                <p className="text-text-secondary mb-6">
                  {error || `The asset "${symbol}" was not found in your portfolio.`}
                </p>
                <Button onClick={() => navigate(ROUTES.DASHBOARD)}>
                  Return to Dashboard
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg relative">
      {/* Atmospheric background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-altrion-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '10s' }}
        />
      </div>

      <Header />

      <main className="max-w-7xl mx-auto px-5 py-6">
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Back Navigation */}
          <motion.div variants={ITEM_VARIANTS}>
            <Button variant="secondary" onClick={() => navigate(ROUTES.DASHBOARD)}>
              <ArrowLeft size={18} />
              Back to Dashboard
            </Button>
          </motion.div>

          {/* Asset Hero */}
          <AssetHero asset={asset} />

          {/* Price Chart */}
          <AssetPriceChart
            symbol={asset.symbol}
            baseValue={asset.totalValue}
            chartPeriod={chartPeriod}
            onPeriodChange={setChartPeriod}
          />

          {/* Two Column Layout: Holdings & Market Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Holdings Accordion */}
            <PlatformHoldingsAccordion
              holdings={asset.holdings}
              symbol={asset.symbol}
              totalValue={asset.totalValue}
            />

            {/* Market Statistics */}
            <MarketStatsCard
              marketStats={asset.marketStats}
              symbol={asset.symbol}
            />
          </div>

          {/* Action Buttons */}
          <AssetActionButtons symbol={asset.symbol} />
        </motion.div>
      </main>
    </div>
  );
}
