import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Onboarding } from './pages/auth/Onboarding';
import { SelectWallets } from './pages/connect/SelectWallets';
import { ConnectAPI } from './pages/connect/ConnectAPI';
import { Dashboard } from './pages/dashboard/Dashboard';
import { ROUTES } from './constants';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />

          {/* Connect Routes */}
          <Route path={ROUTES.CONNECT_SELECT} element={<SelectWallets />} />
          <Route path={ROUTES.CONNECT_API} element={<ConnectAPI />} />

          {/* Dashboard */}
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

          {/* Default redirect */}
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.SIGNUP} replace />} />
          <Route path="*" element={<Navigate to={ROUTES.SIGNUP} replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
