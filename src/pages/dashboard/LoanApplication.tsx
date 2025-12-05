import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Wallet, TrendingUp, Bell, Settings, LogOut } from 'lucide-react';
import { Button, Card, Logo, ThemeToggle } from '../../components/ui';
import { mockPortfolio } from '../../mock/data';
import { formatCurrency, formatPercent } from '../../utils';
import { CONTAINER_VARIANTS, ITEM_VARIANTS, ROUTES } from '../../constants';

export function LoanApplication() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get selected asset IDs from router state
  const { selectedAssetIds = [] } = (location.state as { selectedAssetIds?: string[] }) || {};

  // Filter to get selected assets
  const selectedAssets = mockPortfolio.assets.filter(
    asset => selectedAssetIds.includes(asset.id)
  );

  // Calculate total collateral value
  const totalCollateralValue = selectedAssets.reduce(
    (sum, asset) => sum + asset.value,
    0
  );

  // Calculate loan parameters
  const maxLTV = 60; // 60% Loan-to-Value ratio
  const maxLoanAmount = totalCollateralValue * (maxLTV / 100);
  const interestRate = 5.2; // 5.2% APR

  const handleSubmit = () => {
    alert('Loan application submitted successfully!');
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-dark-bg relative">
      {/* Atmospheric background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-altrion-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Navigation */}
      <nav className="border-b border-dark-border bg-dark-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 py-3">
          <div className="flex items-center justify-between">
            <Logo size="sm" />

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell size={18} />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings size={18} />
              </Button>
              <div className="w-px h-6 bg-dark-border" />
              <ThemeToggle />
              <div className="w-px h-6 bg-dark-border" />
              <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-5 py-6">
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={ITEM_VARIANTS} className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-text-primary">Loan Application</h1>
              <p className="text-text-secondary text-sm mt-0.5">
                Apply for a loan using your selected assets as collateral
              </p>
            </div>
            <Button variant="secondary" onClick={() => navigate(ROUTES.DASHBOARD)}>
              <ArrowLeft size={18} />
              Back to Dashboard
            </Button>
          </motion.div>

          {/* Loan Summary Card */}
          <motion.div variants={ITEM_VARIANTS}>
            <Card variant="bordered" className="bg-gradient-to-br from-dark-card via-dark-elevated to-dark-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-altrion-500/20 flex items-center justify-center">
                  <Wallet size={20} className="text-altrion-400" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-text-primary">
                    Loan Details
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Based on {selectedAssets.length} selected asset{selectedAssets.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-dark-elevated rounded-xl border border-dark-border">
                  <p className="text-text-muted text-xs mb-1 uppercase tracking-wider">
                    Total Collateral
                  </p>
                  <p className="text-text-primary font-bold text-2xl">
                    {formatCurrency(totalCollateralValue)}
                  </p>
                </div>
                <div className="p-4 bg-dark-elevated rounded-xl border border-dark-border">
                  <p className="text-text-muted text-xs mb-1 uppercase tracking-wider">
                    Max Loan Amount
                  </p>
                  <p className="text-altrion-400 font-bold text-2xl">
                    {formatCurrency(maxLoanAmount)}
                  </p>
                  <p className="text-text-muted text-xs mt-1">{maxLTV}% LTV</p>
                </div>
                <div className="p-4 bg-dark-elevated rounded-xl border border-dark-border">
                  <p className="text-text-muted text-xs mb-1 uppercase tracking-wider">
                    Interest Rate
                  </p>
                  <p className="text-text-primary font-bold text-2xl">
                    {interestRate}%
                  </p>
                  <p className="text-text-muted text-xs mt-1">APR</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Selected Assets Table */}
          <motion.div variants={ITEM_VARIANTS}>
            <Card variant="bordered" padding="none">
              <div className="p-5 border-b border-dark-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/20 flex items-center justify-center">
                    <TrendingUp size={20} className="text-accent-cyan" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-text-primary">
                      Selected Collateral Assets
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Assets you've chosen as loan collateral
                    </p>
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
                    {selectedAssets.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-8 text-center">
                          <p className="text-text-muted mb-4">
                            No assets selected. Please go back and select assets.
                          </p>
                          <Button
                            variant="secondary"
                            onClick={() => navigate(ROUTES.DASHBOARD)}
                          >
                            <ArrowLeft size={16} />
                            Back to Dashboard
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      selectedAssets.map((asset, index) => (
                        <motion.tr
                          key={asset.id}
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
                            <span
                              className={`${
                                asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                              }`}
                            >
                              {formatPercent(asset.change24h)}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="px-2 py-1 bg-dark-elevated rounded-lg text-text-secondary text-sm">
                              {asset.platform}
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          {selectedAssets.length > 0 && (
            <motion.div variants={ITEM_VARIANTS} className="flex gap-4 justify-center">
              <Button
                variant="secondary"
                onClick={() => navigate(ROUTES.DASHBOARD)}
              >
                <ArrowLeft size={16} />
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Submit Application
              </Button>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
