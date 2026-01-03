import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Trophy, Star } from 'lucide-react';
import { Button, Card, Logo } from '../../components/ui';
import { useAuthStore } from '../../store';

// Confetti component for celebration moment (peak-end rule)
const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: -20,
          backgroundColor: [
            '#10b981',
            '#06b6d4',
            '#a855f7',
            '#ec4899',
            '#f59e0b',
          ][Math.floor(Math.random() * 5)],
        }}
        animate={{
          y: [0, window.innerHeight + 100],
          x: [0, (Math.random() - 0.5) * 200],
          rotate: [0, Math.random() * 720],
          opacity: [1, 0],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 0.5,
          ease: 'easeOut',
        }}
      />
    ))}
  </div>
);

const steps = [
  {
    id: 1,
    title: 'Nickname',
    description: 'Help us personalize your experience',
  },
];

export function Onboarding() {
  const navigate = useNavigate();
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);
  const [showCelebration, setShowCelebration] = useState(false);
  const [form, setForm] = useState({
    displayName: '',
  });

  const handleNext = () => {
    // Mark onboarding as complete
    completeOnboarding();
    // Peak-end rule: Trigger celebration before final navigation
    setShowCelebration(true);
    setTimeout(() => {
      navigate('/connect/select');
    }, 3000); // Show celebration for 3 seconds
  };

  const canProceed = () => {
    return form.displayName.length >= 2;
  };

  // Calculate progress for Zeigarnik effect
  const progressPercentage = 100;

  // Celebration overlay using peak-end rule
  if (showCelebration) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center relative overflow-hidden">
        <Confetti />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center z-10 relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-altrion-400 to-altrion-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-altrion-500/50"
          >
            <Trophy className="w-12 h-12 text-text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl font-bold text-text-primary mb-4 tracking-tight"
          >
            You're all set, {form.displayName}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-text-secondary text-lg mb-8"
          >
            Let's connect your wallets and start managing your portfolio
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="badge badge-success">
              <Star className="w-4 h-4" />
              Profile Complete
            </div>
            <div className="badge badge-info">
              <Sparkles className="w-4 h-4" />
              Quick Start
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      {/* Header with progress */}
      <div className="p-6 border-b border-dark-border bg-dark-surface/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Logo size="sm" />
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-muted">
                {steps[0].title}
              </span>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: 1.1 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-altrion-500/20 border-2 border-altrion-500 text-altrion-400"
                >
                  1
                </motion.div>
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step Header */}
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-text-primary mb-2 tracking-tight">
                {steps[0].title}
              </h1>
              <p className="text-text-secondary">
                {steps[0].description}
              </p>
            </div>

            {/* Display Name */}
            <Card variant="bordered" className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  What should we call you?
                </label>
                <input
                  type="text"
                  value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  placeholder="Enter your name or nickname"
                  className="w-full bg-dark-input border border-dark-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-altrion-500 focus:ring-1 focus:ring-altrion-500/50 transition-all"
                  autoFocus
                />
              </div>
              <p className="text-sm text-text-muted">
                This is how you'll appear in the app. You can change it later.
              </p>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-end mt-8">
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Continue
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
