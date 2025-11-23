import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, X, Loader2, Shield, ArrowRight, Lock, Eye, CheckCircle2 } from 'lucide-react';
import { Button, Card, Logo } from '../../components/ui';
import { walletPlatforms } from '../../mock/data';
import { PLATFORM_ICONS, ROUTES } from '../../constants';
import { useConnectionStatus } from '../../hooks';

const allPlatforms = [
  ...walletPlatforms.crypto,
  ...walletPlatforms.banks,
  ...walletPlatforms.brokers,
];

export function ConnectAPI() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPlatformIds = (location.state?.platforms as string[]) || [];

  const { connections, allComplete, successCount, retryConnection } = useConnectionStatus({
    platformIds: selectedPlatformIds,
    autoStart: true,
  });

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="p-6 border-b border-dark-border">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <Logo size="sm" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* Enhanced Security Badges - Trust building */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-altrion-500/20 flex items-center justify-center">
                <Shield size={14} className="text-altrion-400" />
              </div>
              <span className="text-text-secondary">256-bit encryption</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-altrion-500/20 flex items-center justify-center">
                <Lock size={14} className="text-altrion-400" />
              </div>
              <span className="text-text-secondary">Zero-knowledge security</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-altrion-500/20 flex items-center justify-center">
                <Eye size={14} className="text-altrion-400" />
              </div>
              <span className="text-text-secondary">Read-only access</span>
            </div>
          </div>
        </motion.div>

        {/* Title with celebration for completion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          {allComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-altrion-400 to-altrion-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-altrion-500/30"
            >
              <CheckCircle2 className="w-8 h-8 text-white" />
            </motion.div>
          )}
          <h1 className="font-display text-4xl font-bold text-white mb-3 tracking-tight">
            {allComplete ? 'All Set!' : 'Connecting your accounts'}
          </h1>
          <p className="text-text-secondary text-lg">
            {allComplete
              ? `Successfully connected ${successCount} of ${connections.length} accounts. You're ready to go!`
              : 'Please wait while we securely connect to your accounts...'}
          </p>
        </motion.div>

        {/* Connection List */}
        <div className="space-y-3 mb-8">
          {connections.map((conn, index) => {
            const platform = allPlatforms.find(p => p.id === conn.platformId);
            if (!platform) return null;

            return (
              <motion.div
                key={conn.platformId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  variant="bordered"
                  className={`transition-all ${
                    conn.status === 'connecting'
                      ? 'border-altrion-500/50 bg-altrion-500/5'
                      : conn.status === 'success'
                      ? 'border-green-500/50 bg-green-500/5'
                      : conn.status === 'error'
                      ? 'border-red-500/50 bg-red-500/5'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Platform Icon */}
                    {(() => {
                      const Icon = PLATFORM_ICONS[platform.id]?.icon;
                      const color = PLATFORM_ICONS[platform.id]?.color || 'bg-gray-500/20 text-gray-400';
                      return (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                          {Icon && <Icon size={24} />}
                        </div>
                      );
                    })()}

                    {/* Platform Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{platform.name}</h3>
                      <p className="text-sm text-text-secondary">
                        {conn.status === 'pending' && 'Waiting...'}
                        {conn.status === 'connecting' && 'Connecting securely...'}
                        {conn.status === 'success' && 'Connected successfully'}
                        {conn.status === 'error' && 'Connection failed'}
                      </p>
                    </div>

                    {/* Status Icon */}
                    <div className="flex items-center gap-2">
                      {conn.status === 'pending' && (
                        <div className="w-8 h-8 rounded-full bg-dark-elevated" />
                      )}
                      {conn.status === 'connecting' && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Loader2 size={24} className="text-altrion-400" />
                        </motion.div>
                      )}
                      {conn.status === 'success' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                        >
                          <Check size={18} className="text-white" />
                        </motion.div>
                      )}
                      {conn.status === 'error' && (
                        <div className="flex items-center gap-2">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
                          >
                            <X size={18} className="text-white" />
                          </motion.div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => retryConnection(index)}
                          >
                            Retry
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar */}
        {!allComplete && (
          <div className="mb-8">
            <div className="h-2 bg-dark-elevated rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-altrion-500 to-altrion-400"
                initial={{ width: '0%' }}
                animate={{
                  width: `${((connections.filter(c => c.status === 'success' || c.status === 'error').length) / connections.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Complete Actions */}
        <AnimatePresence>
          {allComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <Button size="lg" onClick={() => navigate(ROUTES.DASHBOARD)}>
                Go to Dashboard
                <ArrowRight size={18} />
              </Button>
              {successCount < connections.length && (
                <button
                  onClick={() => navigate(ROUTES.CONNECT_SELECT)}
                  className="text-text-secondary hover:text-white transition-colors text-sm"
                >
                  Try connecting failed accounts again
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
