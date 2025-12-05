import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';
import { Card, TableRowSkeleton } from '@/components/ui';
import { formatCurrency, formatPercent } from '@/utils';
import { ITEM_VARIANTS } from '@/constants';
import type { Asset, AssetType } from '@/types';

type TabType = 'all' | 'crypto' | 'stocks' | 'cash';

interface AssetsTableProps {
  assets: Asset[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isLoading?: boolean;
}

const TABS: { id: TabType; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'stocks', label: 'Stocks' },
  { id: 'cash', label: 'Cash' },
];

export const AssetsTable = memo(function AssetsTable({
  assets,
  activeTab,
  onTabChange,
  isLoading = false,
}: AssetsTableProps) {
  const filteredAssets = useCallback(() => {
    if (activeTab === 'all') return assets;
    const typeMap: Record<TabType, AssetType | null> = {
      all: null,
      crypto: 'crypto',
      stocks: 'stock',
      cash: 'stablecoin',
    };
    return assets.filter((asset) => asset.type === typeMap[activeTab]);
  }, [assets, activeTab])();

  return (
    <motion.div variants={ITEM_VARIANTS} className="mt-6">
      <Card variant="bordered" padding="none">
        <div className="p-5 border-b border-dark-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-altrion-500/20 flex items-center justify-center">
                <PieChart size={20} className="text-altrion-400" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-text-primary">
                  Your Assets
                </h3>
                <p className="text-sm text-text-secondary">
                  Detailed breakdown of your holdings
                </p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 bg-dark-elevated p-1 rounded-lg">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-dark-card text-text-primary'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-text-muted text-sm border-b border-dark-border">
                <th className="font-display px-5 py-3 font-medium">Asset</th>
                <th className="font-display px-5 py-3 font-medium">Price</th>
                <th className="font-display px-5 py-3 font-medium">Holdings</th>
                <th className="font-display px-5 py-3 font-medium">Value</th>
                <th className="font-display px-5 py-3 font-medium">24h Change</th>
                <th className="font-display px-5 py-3 font-medium">Platform</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <>
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                </>
              ) : (
                filteredAssets.map((asset, index) => (
                  <AssetRow key={asset.id} asset={asset} index={index} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
});

const AssetRow = memo(function AssetRow({
  asset,
  index,
}: {
  asset: Asset;
  index: number;
}) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-dark-border/50 hover:bg-dark-elevated/50 transition-colors"
    >
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-dark-elevated flex items-center justify-center font-bold text-sm">
            {asset.symbol.slice(0, 2)}
          </div>
          <div>
            <p className="font-medium text-text-primary">{asset.name}</p>
            <p className="text-text-muted text-sm">{asset.symbol}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-3 text-text-primary font-semibold">
        {formatCurrency(asset.price)}
      </td>
      <td className="px-5 py-3 text-text-primary">
        {asset.amount.toLocaleString()} {asset.symbol}
      </td>
      <td className="px-5 py-3 font-semibold text-text-primary">
        {formatCurrency(asset.value)}
      </td>
      <td className="px-5 py-3">
        <span className={asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
          {formatPercent(asset.change24h)}
        </span>
      </td>
      <td className="px-5 py-3">
        <span className="px-2 py-1 bg-dark-elevated rounded-lg text-text-secondary text-sm">
          {asset.platform}
        </span>
      </td>
    </motion.tr>
  );
});
