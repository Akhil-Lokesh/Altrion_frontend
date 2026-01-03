import { useMemo } from 'react';
import { mockPortfolio } from '../mock/data';
import { mockMarketStats } from '../mock/marketStats';
import type { AggregatedAssetDetail, PlatformHolding } from '../types';

interface UseAssetDetailResult {
  asset: AggregatedAssetDetail | null;
  isLoading: boolean;
  error: string | null;
}

export function useAssetDetail(symbol: string): UseAssetDetailResult {
  const result = useMemo(() => {
    // Filter assets by symbol
    const matchingAssets = mockPortfolio.assets.filter(
      (asset) => asset.symbol.toUpperCase() === symbol.toUpperCase()
    );

    if (matchingAssets.length === 0) {
      return {
        asset: null,
        isLoading: false,
        error: `Asset ${symbol} not found in your portfolio`,
      };
    }

    // Get the first asset for common properties
    const firstAsset = matchingAssets[0];

    // Group holdings by platform
    const holdings: PlatformHolding[] = matchingAssets.map((asset) => ({
      platform: asset.platform,
      amount: asset.amount,
      value: asset.value,
    }));

    // Calculate totals
    const totalAmount = holdings.reduce((sum, h) => sum + h.amount, 0);
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);

    // Get market stats (fallback to empty stats if not found)
    const marketStats = mockMarketStats[symbol.toUpperCase()] || {
      marketCap: 0,
      volume24h: 0,
      circulatingSupply: 0,
      maxSupply: null,
      allTimeHigh: 0,
      allTimeHighDate: '',
      allTimeLow: 0,
      allTimeLowDate: '',
      high52w: 0,
      low52w: 0,
      priceChange1h: 0,
      priceChange24h: firstAsset.change24h,
      priceChange7d: 0,
      priceChange30d: 0,
    };

    const aggregatedAsset: AggregatedAssetDetail = {
      symbol: firstAsset.symbol,
      name: firstAsset.name,
      type: firstAsset.type,
      price: firstAsset.price,
      change24h: firstAsset.change24h,
      totalAmount,
      totalValue,
      holdings,
      marketStats,
    };

    return {
      asset: aggregatedAsset,
      isLoading: false,
      error: null,
    };
  }, [symbol]);

  return result;
}
