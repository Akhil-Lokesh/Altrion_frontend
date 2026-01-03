import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, Calculator } from 'lucide-react';
import { Card } from '@/components/ui';
import { formatCurrency } from '@/utils';
import { ITEM_VARIANTS } from '@/constants';

// Asset logo URLs
const ASSET_LOGOS: Record<string, string> = {
  BTC: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  ETH: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  USDC: 'https://assets.coingecko.com/coins/images/6319/large/usdc.png',
  USDT: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
  SOL: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
  DOGE: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
  ADA: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
  XRP: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
};

interface PriceCalculatorProps {
  symbol: string;
  price: number;
}

export const PriceCalculator = memo(function PriceCalculator({
  symbol,
  price,
}: PriceCalculatorProps) {
  const [assetAmount, setAssetAmount] = useState<string>('1');
  const [usdAmount, setUsdAmount] = useState<string>(price.toFixed(2));
  const [activeInput, setActiveInput] = useState<'asset' | 'usd'>('asset');

  useEffect(() => {
    if (activeInput === 'asset') {
      const amount = parseFloat(assetAmount) || 0;
      setUsdAmount((amount * price).toFixed(2));
    }
  }, [assetAmount, price, activeInput]);

  useEffect(() => {
    if (activeInput === 'usd') {
      const amount = parseFloat(usdAmount) || 0;
      const assetValue = amount / price;
      setAssetAmount(assetValue > 0 ? assetValue.toFixed(8).replace(/\.?0+$/, '') : '0');
    }
  }, [usdAmount, price, activeInput]);

  const handleAssetChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setActiveInput('asset');
      setAssetAmount(value);
    }
  };

  const handleUsdChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setActiveInput('usd');
      setUsdAmount(value);
    }
  };

  const logoUrl = ASSET_LOGOS[symbol];

  return (
    <motion.div variants={ITEM_VARIANTS}>
      <Card variant="bordered" padding="none" className="overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-light-border dark:border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-altrion-500/20 flex items-center justify-center">
              <Calculator size={20} className="text-altrion-400" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-text-primary">
                Price Calculator
              </h3>
              <p className="text-xs text-text-muted">
                1 {symbol} = {formatCurrency(price)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="relative">
            {/* Asset Input */}
            <div className="p-3 bg-light-elevated dark:bg-dark-elevated rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {logoUrl ? (
                    <img src={logoUrl} alt={symbol} className="w-6 h-6 rounded-full" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-altrion-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-altrion-400">{symbol[0]}</span>
                    </div>
                  )}
                  <span className="text-sm font-semibold text-text-primary">{symbol}</span>
                </div>
              </div>
              <input
                type="text"
                inputMode="decimal"
                value={assetAmount}
                onChange={(e) => handleAssetChange(e.target.value)}
                onFocus={() => setActiveInput('asset')}
                placeholder="0"
                className="w-full bg-transparent text-2xl font-bold text-text-primary focus:outline-none placeholder:text-text-muted/50"
              />
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center -my-2 relative z-10">
              <div className="w-9 h-9 rounded-full bg-light-card dark:bg-dark-card border-4 border-light-bg dark:border-dark-card flex items-center justify-center">
                <ArrowDownUp size={14} className="text-text-muted" />
              </div>
            </div>

            {/* USD Input */}
            <div className="p-3 bg-light-elevated dark:bg-dark-elevated rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">$</span>
                  </div>
                  <span className="text-sm font-semibold text-text-primary">USD</span>
                </div>
              </div>
              <input
                type="text"
                inputMode="decimal"
                value={usdAmount}
                onChange={(e) => handleUsdChange(e.target.value)}
                onFocus={() => setActiveInput('usd')}
                placeholder="0"
                className="w-full bg-transparent text-2xl font-bold text-text-primary focus:outline-none placeholder:text-text-muted/50"
              />
            </div>
          </div>

          {/* Quick Amounts */}
          <div className="grid grid-cols-5 gap-1.5 mt-4">
            {[0.1, 0.5, 1, 5, 10].map((amount) => (
              <button
                key={amount}
                onClick={() => handleAssetChange(amount.toString())}
                className={`py-2 text-xs font-medium rounded-lg transition-colors ${
                  assetAmount === amount.toString()
                    ? 'bg-altrion-500 text-white'
                    : 'text-text-muted bg-light-elevated dark:bg-dark-elevated hover:text-text-secondary'
                }`}
              >
                {amount}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
});
