import { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui';
import { formatCurrency, formatPercent } from '@/utils';
import { ITEM_VARIANTS } from '@/constants';
import type { AggregatedAssetDetail } from '@/types';

interface AssetHeroProps {
  asset: AggregatedAssetDetail;
}

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  crypto: { label: 'Cryptocurrency', color: 'bg-green-500/20 text-green-400' },
  stock: { label: 'Stock', color: 'bg-blue-500/20 text-blue-400' },
  stablecoin: { label: 'Stablecoin', color: 'bg-amber-500/20 text-amber-400' },
};

// Crypto logo URLs from CoinGecko CDN
const ASSET_LOGOS: Record<string, string> = {
  BTC: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  ETH: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  USDC: 'https://assets.coingecko.com/coins/images/6319/large/usdc.png',
  USDT: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
  SOL: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
  BNB: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
  XRP: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
  ADA: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
  DOGE: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
  MATIC: 'https://assets.coingecko.com/coins/images/4713/large/polygon.png',
};

export const AssetHero = memo(function AssetHero({ asset }: AssetHeroProps) {
  const typeInfo = TYPE_LABELS[asset.type] || TYPE_LABELS.crypto;
  const isPositive = asset.change24h >= 0;

  return (
    <motion.div variants={ITEM_VARIANTS}>
      <Card
        variant="bordered"
        className="relative overflow-hidden bg-gradient-to-br from-dark-card via-dark-elevated to-dark-card border-altrion-500/20"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left: Asset Info */}
          <div className="flex items-center gap-5">
            {/* Asset Icon - Clean circular design */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-dark-elevated to-dark-bg flex items-center justify-center border border-dark-border shadow-lg">
                {ASSET_LOGOS[asset.symbol] ? (
                  <img
                    src={ASSET_LOGOS[asset.symbol]}
                    alt={asset.name}
                    className="w-11 h-11 object-contain"
                  />
                ) : (
                  <span className="font-bold text-2xl text-text-muted">
                    {asset.symbol.slice(0, 2)}
                  </span>
                )}
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-altrion-500/10 blur-xl -z-10" />
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <h1 className="font-display text-3xl font-bold text-text-primary">
                  {asset.name}
                </h1>
                <span className="text-text-muted text-lg">{asset.symbol}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeInfo.color}`}>
                  {typeInfo.label}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-dark-elevated text-text-secondary border border-dark-border">
                  {asset.holdings.length} Platform{asset.holdings.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Price & Holdings - Side by Side */}
          <div className="flex items-center gap-8">
            {/* Current Price */}
            <div className="text-right">
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Current Price</p>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-3xl font-bold text-text-primary">
                  {formatCurrency(asset.price)}
                </span>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                    isPositive
                      ? 'bg-green-500/15 text-green-400'
                      : 'bg-red-500/15 text-red-400'
                  }`}
                >
                  {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {formatPercent(asset.change24h)}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-12 bg-dark-border" />

            {/* Total Holdings */}
            <div className="text-right">
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Your Holdings</p>
              <p className="text-2xl font-bold text-altrion-400">
                {formatCurrency(asset.totalValue)}
              </p>
              <p className="text-text-secondary text-sm">
                {asset.totalAmount.toLocaleString()} {asset.symbol}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});
