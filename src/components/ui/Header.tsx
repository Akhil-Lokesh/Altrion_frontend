import { Bell, Settings, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useLogout } from '../../hooks';
import { useAuthStore } from '../../store';
import { ROUTES } from '../../constants';

export function Header() {
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const user = useAuthStore((state) => state.user);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="header-nav border-b border-dark-border bg-dark-card/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-1.5">
        <div className="flex items-center justify-between">
          <Logo size="md" variant="icon" />

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.PROFILE)}>
              <Settings size={18} />
            </Button>
            <div className="w-px h-6 bg-dark-border" />
            <ThemeToggle />
            <div className="w-px h-6 bg-dark-border" />

            {/* Profile Avatar/Button */}
            <button
              onClick={() => navigate(ROUTES.PROFILE)}
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-dark-elevated transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-altrion-500/20 flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : user?.name ? (
                  <span className="text-xs font-bold text-altrion-400">
                    {getInitials(user.name)}
                  </span>
                ) : (
                  <User size={16} className="text-altrion-400" />
                )}
              </div>
            </button>

            <div className="w-px h-6 bg-dark-border" />
            <Button variant="ghost" size="sm" onClick={() => logoutMutation.mutate()}>
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
