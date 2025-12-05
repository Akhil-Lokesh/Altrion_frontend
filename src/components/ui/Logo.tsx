import { motion } from 'framer-motion';
import logoImage from '../../assets/logo.png';
import logoIconImage from '../../assets/logo2.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'full' | 'icon';
}

export function Logo({ size = 'md', showText = true, variant = 'full' }: LogoProps) {
  const sizes = {
    sm: { icon: 56, text: 'text-lg' },
    md: { icon: 56, text: 'text-xl' },
    lg: { icon: 240, text: 'text-3xl' },
  };

  const logoSrc = variant === 'icon' ? logoIconImage : logoImage;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3"
    >
      <img
        src={logoSrc}
        alt="Altrion Logo"
        style={{ height: sizes[size].icon, width: 'auto' }}
        className="object-contain"
      />

      {showText && variant === 'full' && (
        <span className={`font-bold ${sizes[size].text} tracking-wide`}>
          <span className="text-text-primary">ALTR</span>
          <span className="text-altrion-400">ION</span>
        </span>
      )}
    </motion.div>
  );
}
