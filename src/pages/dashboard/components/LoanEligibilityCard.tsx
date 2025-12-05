import { memo } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { formatCurrency } from '@/utils';
import { ITEM_VARIANTS } from '@/constants';
import type { LoanEligibility } from '@/types';

interface LoanEligibilityCardProps {
  loanEligibility: LoanEligibility;
  onApply?: () => void;
}

export const LoanEligibilityCard = memo(function LoanEligibilityCard({
  loanEligibility,
  onApply,
}: LoanEligibilityCardProps) {
  return (
    <motion.div variants={ITEM_VARIANTS}>
      <Card variant="bordered">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-altrion-500/20 flex items-center justify-center">
              <Wallet size={20} className="text-altrion-400" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-text-primary">
                Loan Eligibility
              </h3>
              <p className="text-sm text-text-secondary">Based on your portfolio</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-text-muted text-xs">Max Loan Amount</span>
              <span className="text-xl font-bold text-altrion-400">
                {formatCurrency(loanEligibility.maxLoanAmount)}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-text-muted text-xs">Max LTV</span>
              <span className="text-xl font-bold text-text-primary">
                {loanEligibility.maxLTV}%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-text-muted text-xs">Interest Rate</span>
              <span className="text-xl font-bold text-text-primary">5.2%</span>
            </div>
          </div>

          <Button onClick={onApply}>
            Apply for a Loan
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
});
