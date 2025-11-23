import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 56, text: 'text-3xl' },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3"
    >
      {/* Geometric A Logo */}
      <div
        className="relative"
        style={{ width: sizes[size].icon, height: sizes[size].icon }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer hexagon shape */}
          <defs>
            <linearGradient id="altrionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {/* Stylized A shape */}
          <path
            d="M50 10 L85 80 L70 80 L60 60 L40 60 L30 80 L15 80 L50 10Z"
            fill="url(#altrionGradient)"
          />
          <path
            d="M50 35 L58 50 L42 50 L50 35Z"
            fill="#0a0a0f"
          />
          {/* Accent line */}
          <path
            d="M25 85 L75 85"
            stroke="url(#altrionGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {showText && (
        <span className={`font-bold ${sizes[size].text} tracking-wide`}>
          <span className="text-text-primary">ALTR</span>
          <span className="text-altrion-400">ION</span>
        </span>
      )}
    </motion.div>
  );
}
