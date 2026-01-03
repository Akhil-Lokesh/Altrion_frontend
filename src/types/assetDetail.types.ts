// Asset Detail Page Types

export interface PlatformHolding {
  platform: string;
  amount: number;
  value: number;
}

export interface AssetMarketStats {
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  allTimeHigh: number;
  allTimeHighDate: string;
  allTimeLow: number;
  allTimeLowDate: string;
  high52w: number;
  low52w: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  priceChange30d: number;
}

export interface AggregatedAssetDetail {
  symbol: string;
  name: string;
  type: 'crypto' | 'stock' | 'stablecoin';
  price: number;
  change24h: number;
  totalAmount: number;
  totalValue: number;
  holdings: PlatformHolding[];
  marketStats: AssetMarketStats;
}
