import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Settings,
  LogOut,
  AlertCircle,
  Wallet,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Button, Card, Logo, ThemeToggle } from '../../components/ui';
import { formatCurrency } from '../../utils';
import { CONTAINER_VARIANTS, ITEM_VARIANTS, ROUTES } from '../../constants';
import { useLogout } from '../../hooks';
import { useLoanStore } from '../../store';

interface LoanReviewData {
  totalCollateral: number;
  loanAmount: number;
  interestRate: number;
  ltv: number;
  selectedAssets: Array<{
    name: string;
    symbol: string;
    amount: number;
    value: number;
  }>;
}

export function LoanReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const logoutMutation = useLogout();
  const addApplication = useLoanStore((state) => state.addApplication);

  // Get loan data from router state
  const loanData = location.state as LoanReviewData | null;

  // If no loan data, redirect to loan application
  useEffect(() => {
    if (!loanData) {
      navigate(ROUTES.LOAN_APPLICATION);
    }
  }, [loanData, navigate]);

  const handleConfirm = () => {
    if (!loanData) return;

    // Save the loan application to the store
    const applicationId = addApplication({
      totalCollateral: loanData.totalCollateral,
      loanAmount: loanData.loanAmount,
      interestRate: loanData.interestRate,
      ltv: loanData.ltv,
      selectedAssets: loanData.selectedAssets,
    });

    // Navigate to confirmation/success page with the application ID
    navigate(ROUTES.LOAN_CONFIRMATION, { state: { ...loanData, applicationId } });
  };

  const handleGoBack = () => {
    navigate(ROUTES.LOAN_APPLICATION);
  };

  if (!loanData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-bg relative">
      {/* Atmospheric background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-altrion-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Navigation */}
      <nav className="border-b border-dark-border bg-dark-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 py-0.5">
          <div className="flex items-center justify-between">
            <div className="-ml-2">
              <Logo size="sm" variant="icon" />
            </div>

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
              <Button variant="ghost" size="sm" onClick={() => logoutMutation.mutate()}>
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-5 py-8">
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={ITEM_VARIANTS} className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center"
            >
              <AlertCircle size={36} className="text-amber-400" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-text-primary mb-2">
              Confirm Your Loan Application
            </h1>
            <p className="text-text-secondary">
              Please review the details below before submitting your application.
            </p>
          </motion.div>

          {/* Loan Details Card */}
          <motion.div variants={ITEM_VARIANTS}>
            <Card variant="bordered" className="border-amber-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-altrion-500/20 flex items-center justify-center">
                  <Wallet size={20} className="text-altrion-400" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-text-primary">Loan Details</h3>
                  <p className="text-sm text-text-secondary">Review your loan terms</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-dark-elevated rounded-xl">
                  <p className="text-text-muted text-xs mb-1">Total Collateral</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {formatCurrency(loanData.totalCollateral)}
                  </p>
                </div>
                <div className="p-4 bg-dark-elevated rounded-xl">
                  <p className="text-text-muted text-xs mb-1">Loan Amount</p>
                  <p className="text-2xl font-bold text-altrion-400">
                    {formatCurrency(loanData.loanAmount)}
                  </p>
                </div>
                <div className="p-4 bg-dark-elevated rounded-xl">
                  <p className="text-text-muted text-xs mb-1">Interest Rate</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {loanData.interestRate}% APR
                  </p>
                </div>
                <div className="p-4 bg-dark-elevated rounded-xl">
                  <p className="text-text-muted text-xs mb-1">LTV Ratio</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {loanData.ltv}%
                  </p>
                </div>
              </div>

              {/* Selected Assets */}
              <div className="border-t border-dark-border pt-4">
                <p className="text-sm font-medium text-text-secondary mb-3">
                  Collateral Assets ({loanData.selectedAssets.length})
                </p>
                <div className="space-y-2">
                  {loanData.selectedAssets.map((asset, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-dark-elevated rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-dark-card flex items-center justify-center font-bold text-sm">
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{asset.name}</p>
                          <p className="text-text-muted text-sm">
                            {asset.amount.toLocaleString()} {asset.symbol}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-text-primary">
                        {formatCurrency(asset.value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Warning Notice */}
          <motion.div variants={ITEM_VARIANTS}>
            <Card variant="bordered" className="bg-amber-500/5 border-amber-500/30">
              <div className="flex gap-3">
                <Shield size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-text-primary mb-1">Important Notice</p>
                  <p className="text-sm text-text-secondary">
                    By submitting this application, you agree to lock the selected assets as collateral.
                    These assets will be held until the loan is fully repaid. Make sure you understand
                    the terms before proceeding.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={ITEM_VARIANTS} className="flex gap-4 justify-center pt-4">
            <Button
              variant="secondary"
              onClick={handleGoBack}
            >
              <ArrowLeft size={16} />
              Go Back & Edit
            </Button>
            <Button onClick={handleConfirm}>
              Confirm & Submit
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
