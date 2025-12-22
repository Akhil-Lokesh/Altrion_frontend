import { api } from './api';
import type { User, AuthResponse } from '@/types';
import type { LoginFormData, SignupFormData } from '@/schemas';

// Backend response type (different from frontend types)
interface BackendAuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string | null;
      provider: string;
      isEmailVerified: boolean;
    };
    accessToken: string;
    refreshToken: string;
  };
}

interface BackendUserResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string | null;
      provider: string;
      isEmailVerified: boolean;
    };
  };
}

// Transform backend user to frontend User type
const transformBackendUser = (backendUser: BackendAuthResponse['data']['user']): User => ({
  id: backendUser.id,
  email: backendUser.email,
  name: backendUser.name,
  displayName: backendUser.name,
  avatar: backendUser.avatar || undefined,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// Transform backend response to frontend AuthResponse type
const transformAuthResponse = (backendResponse: BackendAuthResponse): AuthResponse => ({
  user: transformBackendUser(backendResponse.data.user),
  tokens: {
    accessToken: backendResponse.data.accessToken,
    refreshToken: backendResponse.data.refreshToken,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
  },
});

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    const { data } = await api.post<BackendAuthResponse>('/auth/signin', credentials);
    return transformAuthResponse(data);
  },

  /**
   * Register a new user
   */
  async signup(data: SignupFormData): Promise<AuthResponse> {
    const { data: response } = await api.post<BackendAuthResponse>('/auth/signup', data);
    return transformAuthResponse(response);
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    const token = localStorage.getItem('altrion-auth');
    let refreshToken = null;

    if (token) {
      try {
        const parsed = JSON.parse(token);
        refreshToken = parsed.state?.refreshToken || null;
      } catch {
        // Ignore parsing errors
      }
    }

    await api.post('/auth/logout', { refreshToken });
  },

  /**
   * Refresh authentication tokens
   */
  async refreshToken(_refreshToken: string): Promise<AuthResponse> {
    // TODO: Replace with real API call
    // const { data } = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
    // return data;

    await simulateDelay(500);
    
    return {
      user: mockUser,
      tokens: {
        accessToken: 'new-mock-access-token',
        refreshToken: 'new-mock-refresh-token',
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      },
    };
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<BackendUserResponse>('/auth/me');
    return transformBackendUser(data.data.user);
  },

  /**
   * Request password reset
   */
  async forgotPassword(_email: string): Promise<void> {
    // TODO: Replace with real API call
    // await api.post('/auth/forgot-password', { email });
    
    await simulateDelay(1000);
  },

  /**
   * Reset password with token
   */
  async resetPassword(_token: string, _password: string): Promise<void> {
    // TODO: Replace with real API call
    // await api.post('/auth/reset-password', { token, password });
    
    await simulateDelay(1000);
  },

  /**
   * OAuth login initiation
   */
  async oauthLogin(provider: 'google' | 'github'): Promise<string> {
    // Return the OAuth initiation URL
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    return `${baseUrl}/auth/${provider}`;
  },
};

export default authService;
