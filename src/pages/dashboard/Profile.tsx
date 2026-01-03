import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../../components/ui';
import { CONTAINER_VARIANTS, ITEM_VARIANTS, ROUTES } from '../../constants';
import { ProfileHeader, LoanApplicationsCard, ConnectedAccountsCard } from './components';

export function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-bg relative">
      {/* Atmospheric background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-altrion-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <Header />

      <main className="max-w-4xl mx-auto px-5 py-6">
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Page Title */}
          <motion.div variants={ITEM_VARIANTS} className="flex items-center gap-4">
            <button
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="w-10 h-10 rounded-xl bg-light-elevated dark:bg-dark-elevated flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-light-card dark:hover:bg-dark-card transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="font-display text-3xl font-bold text-text-primary">Profile</h1>
              <p className="text-text-secondary text-sm mt-0.5">Manage your account and view your loan applications</p>
            </div>
          </motion.div>

          {/* Profile Header */}
          <motion.div variants={ITEM_VARIANTS}>
            <ProfileHeader />
          </motion.div>

          {/* Loan Applications */}
          <motion.div variants={ITEM_VARIANTS}>
            <LoanApplicationsCard />
          </motion.div>

          {/* Connected Accounts */}
          <motion.div variants={ITEM_VARIANTS}>
            <ConnectedAccountsCard />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
