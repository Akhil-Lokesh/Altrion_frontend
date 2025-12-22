import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle,
  Bell,
  Settings,
  LogOut,
  Copy,
  Home,
  FileText,
  Clock,
  Shield,
  Wallet,
} from 'lucide-react';
import { Button, Card, Logo, ThemeToggle } from '../../components/ui';
import { formatCurrency } from '../../utils';
import { CONTAINER_VARIANTS, ITEM_VARIANTS, ROUTES } from '../../constants';
import { useLogout } from '../../hooks';

interface LoanConfirmationData {
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
  applicationId?: string;
}

export function LoanConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const logoutMutation = useLogout();
  const [copied, setCopied] = useState(false);

  // Get loan data from router state
  const loanData = location.state as LoanConfirmationData | null;

  // Use application ID from store or generate a fallback
  const applicationId = loanData?.applicationId || (() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'ALT-';
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  })();

  // Generate submission date
  const submissionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // If no loan data, redirect to dashboard
  useEffect(() => {
    if (!loanData) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [loanData, navigate]);

  const copyApplicationId = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      <main className="max-w-4xl mx-auto px-5 pt-16">
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Success Header */}
          <motion.div variants={ITEM_VARIANTS} className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-altrion-500/20 flex items-center justify-center"
            >
              <CheckCircle size={48} className="text-altrion-400" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-text-primary mb-2">
              Application Submitted Successfully!
            </h1>
            <p className="text-text-secondary">
              Your loan application has been received and is being processed.
            </p>
          </motion.div>

          {/* Application ID Card */}
          <motion.div variants={ITEM_VARIANTS}>
            <Card variant="bordered" className="bg-gradient-to-br from-dark-card via-dark-elevated to-dark-card border-altrion-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-muted text-sm mb-1">Application ID</p>
                  <p className="text-2xl font-bold text-text-primary font-mono">{applicationId}</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={copyApplicationId}
                >
                  {copied ? (
                    <>
                      <CheckCircle size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy ID
                    </>
                  )}
                </Button>
              </div>
              <p className="text-text-muted text-xs mt-3">
                Save this ID for your records. You'll need it to track your application status.
              </p>
            </Card>
          </motion.div>

          {/* Loan Summary */}
          <motion.div variants={ITEM_VARIANTS}>
            <Card variant="bordered">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-altrion-500/20 flex items-center justify-center">
                  <Wallet size={20} className="text-altrion-400" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-text-primary">Loan Summary</h3>
                  <p className="text-sm text-text-secondary">Review your loan details</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-dark-elevated rounded-xl">
                  <p className="text-text-muted text-xs mb-1">Total Collateral</p>
                  <p className="text-xl font-bold text-text-primary">
                    {formatCurrency(loanData.totalCollateral)}
                  </p>
                </div>
                <div className="p-4 bg-dark-elevated rounded-xl">
                  <p className="text-text-muted text-xs mb-1">Loan Amount</p>
                  <p className="text-xl font-bold text-altrion-400">
                    {formatCurrency(loanData.loanAmount)}
                  </p>
                </div>
                <div className="p-4 bg-dark-elevated rounded-xl">
                  <p className="text-text-muted text-xs mb-1">Interest Rate</p>
                  <p className="text-xl font-bold text-text-primary">
                    {loanData.interestRate}% APR
                  </p>
                </div>
                <div className="p-4 bg-dark-elevated rounded-xl">
                  <p className="text-text-muted text-xs mb-1">LTV Ratio</p>
                  <p className="text-xl font-bold text-text-primary">
                    {loanData.ltv}%
                  </p>
                </div>
              </div>

              {/* Selected Assets */}
              <div className="border-t border-dark-border pt-4">
                <p className="text-sm font-medium text-text-secondary mb-3">Collateral Assets</p>
                <div className="space-y-2">
                  {loanData.selectedAssets.map((asset, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-dark-elevated rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-dark-card flex items-center justify-center font-bold text-xs">
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary text-sm">{asset.name}</p>
                          <p className="text-text-muted text-xs">
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

          {/* Timeline / What's Next */}
          <motion.div variants={ITEM_VARIANTS}>
            <Card variant="bordered">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-cyan/20 flex items-center justify-center">
                  <Clock size={20} className="text-accent-cyan" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-text-primary">What's Next?</h3>
                  <p className="text-sm text-text-secondary">Expected timeline for your application</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-altrion-500 flex items-center justify-center">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div className="w-0.5 h-full bg-altrion-500 mt-2" />
                  </div>
                  <div className="pb-6">
                    <p className="font-medium text-text-primary">Application Submitted</p>
                    <p className="text-sm text-text-muted">{submissionDate}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-dark-elevated border-2 border-altrion-500 flex items-center justify-center">
                      <Shield size={16} className="text-altrion-400" />
                    </div>
                    <div className="w-0.5 h-full bg-dark-border mt-2" />
                  </div>
                  <div className="pb-6">
                    <p className="font-medium text-text-primary">Collateral Verification</p>
                    <p className="text-sm text-text-muted">Usually within 24 hours</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-dark-elevated border-2 border-dark-border flex items-center justify-center">
                      <FileText size={16} className="text-text-muted" />
                    </div>
                    <div className="w-0.5 h-full bg-dark-border mt-2" />
                  </div>
                  <div className="pb-6">
                    <p className="font-medium text-text-secondary">Final Approval</p>
                    <p className="text-sm text-text-muted">1-2 business days</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-dark-elevated border-2 border-dark-border flex items-center justify-center">
                      <Wallet size={16} className="text-text-muted" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-text-secondary">Funds Disbursement</p>
                    <p className="text-sm text-text-muted">Same day after approval</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={ITEM_VARIANTS} className="flex justify-center">
            <Button onClick={() => navigate(ROUTES.DASHBOARD)}>
              <Home size={16} />
              Back to Dashboard
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.div variants={ITEM_VARIANTS} className="text-center">
            <p className="text-text-muted text-sm">
              Questions about your application? Contact our support team at{' '}
              <a href="mailto:support@altrion.com" className="text-altrion-400 hover:underline">
                support@altrion.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
