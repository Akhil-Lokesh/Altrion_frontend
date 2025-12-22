import type { WalletPlatforms, Portfolio, LoanEligibility } from '../types';

// Mock wallet platforms
export const walletPlatforms: WalletPlatforms = {
  crypto: [
    { id: 'metamask', name: 'MetaMask', icon: '🦊', category: 'crypto' },
    { id: 'coinbase', name: 'Coinbase', icon: '🔵', category: 'crypto' },
    { id: 'binance', name: 'Binance', icon: '🟡', category: 'crypto' },
    { id: 'phantom', name: 'Phantom', icon: '👻', category: 'crypto' },
    { id: 'ledger', name: 'Ledger', icon: '🔐', category: 'crypto' },
    { id: 'trustwallet', name: 'Trust Wallet', icon: '🛡️', category: 'crypto' },
  ],
  banks: [
    { id: 'chase', name: 'Chase', icon: '🏦', category: 'bank' },
    { id: 'bofa', name: 'Bank of America', icon: '🏦', category: 'bank' },
    { id: 'wells', name: 'Wells Fargo', icon: '🏦', category: 'bank' },
    { id: 'citi', name: 'Citibank', icon: '🏦', category: 'bank' },
  ],
  brokers: [
    { id: 'robinhood', name: 'Robinhood', icon: '🪶', category: 'broker' },
    { id: 'schwab', name: 'Charles Schwab', icon: '📈', category: 'broker' },
    { id: 'fidelity', name: 'Fidelity', icon: '📊', category: 'broker' },
    { id: 'etrade', name: 'E*TRADE', icon: '💹', category: 'broker' },
  ],
};

// Mock portfolio data
export const mockPortfolio: Portfolio = {
  totalValue: 127450.32,
  change24h: 2.4,
  assets: [
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 1.5,
      value: 67500,
      price: 45000,
      change24h: 3.2,
      platform: 'Coinbase',
      type: 'crypto',
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 12.5,
      value: 31250,
      price: 2500,
      change24h: -1.5,
      platform: 'MetaMask',
      type: 'crypto',
    },
    {
      id: '3',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      amount: 50,
      value: 9500,
      price: 190,
      change24h: 0.8,
      platform: 'Robinhood',
      type: 'stock',
    },
    {
      id: '4',
      symbol: 'USDC',
      name: 'USD Coin',
      amount: 15000,
      value: 15000,
      price: 1,
      change24h: 0,
      platform: 'Coinbase',
      type: 'stablecoin',
    },
    {
      id: '5',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      amount: 15,
      value: 4200.32,
      price: 280.02,
      change24h: 5.2,
      platform: 'Charles Schwab',
      type: 'stock',
    },
  ],
};

// Mock loan eligibility
export const mockLoanEligibility: LoanEligibility = {
  maxLoanAmount: 76470.19,
  currentLTV: 0,
  maxLTV: 60,
  eligibleCollateral: 127450.32,
  riskScore: 72,
  riskLevel: 'Low',
};
