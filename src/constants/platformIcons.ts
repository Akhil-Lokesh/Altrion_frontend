import {
  Hexagon,
  Circle,
  Coins,
  Ghost,
  Lock,
  Shield,
  DollarSign,
  Building2,
  Truck,
  Landmark,
  Feather,
  BarChart3,
  Star,
  ArrowUpDown,
} from 'lucide-react';
import type { PlatformIcon } from '../types';

export const PLATFORM_ICONS: Record<string, PlatformIcon> = {
  // Crypto Wallets
  metamask: { icon: Hexagon, color: 'bg-orange-500/20 text-orange-400' },
  coinbase: { icon: Circle, color: 'bg-blue-500/20 text-blue-400' },
  binance: { icon: Coins, color: 'bg-yellow-500/20 text-yellow-400' },
  phantom: { icon: Ghost, color: 'bg-purple-500/20 text-purple-400' },
  ledger: { icon: Lock, color: 'bg-slate-500/20 text-slate-400' },
  trustwallet: { icon: Shield, color: 'bg-cyan-500/20 text-cyan-400' },

  // Banks
  chase: { icon: DollarSign, color: 'bg-blue-600/20 text-blue-500' },
  bofa: { icon: Building2, color: 'bg-red-600/20 text-red-500' },
  wells: { icon: Truck, color: 'bg-yellow-600/20 text-yellow-500' },
  citi: { icon: Landmark, color: 'bg-blue-500/20 text-blue-400' },

  // Brokerages
  robinhood: { icon: Feather, color: 'bg-green-500/20 text-green-400' },
  schwab: { icon: BarChart3, color: 'bg-cyan-600/20 text-cyan-500' },
  fidelity: { icon: Star, color: 'bg-green-600/20 text-green-500' },
  etrade: { icon: ArrowUpDown, color: 'bg-purple-600/20 text-purple-500' },
};
