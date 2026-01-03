export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  SIGNUP: '/signup',
  ONBOARDING: '/onboarding',

  // Connect routes
  CONNECT_SELECT: '/connect/select',
  CONNECT_API: '/connect/api',

  // App routes
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  LOAN_DETAIL: '/dashboard/profile/loan/:id',
  ASSET_DETAIL: '/dashboard/asset/:symbol',
  LOAN_APPLICATION: '/dashboard/loan',
  LOAN_REVIEW: '/dashboard/loan/review',
  LOAN_SUMMARY: '/dashboard/loan/summary',
  LOAN_CONFIRMATION: '/dashboard/loan/confirmation',

  // Default
  HOME: '/',
} as const;

// Helper function to generate asset detail route
export const getAssetDetailRoute = (symbol: string) =>
  `/dashboard/asset/${symbol}`;

// Helper function to generate loan detail route
export const getLoanDetailRoute = (id: string) =>
  `/dashboard/profile/loan/${id}`;
