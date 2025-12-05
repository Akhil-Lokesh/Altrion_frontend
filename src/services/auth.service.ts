import { ApiError } from './api';
import type { User, AuthResponse } from '@/types';
import type { LoginFormData, SignupFormData } from '@/schemas';

// Simulated delay for demo purposes - remove in production
const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock user for development - replace with real API calls
const mockUser: User = {
  id: '1',
  email: 'demo@altrion.io',
  name: 'Demo User',
  displayName: 'Demo',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    // TODO: Replace with real API call
    // const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    // return data;

    // Mock implementation for development
    await simulateDelay(1500);
    
    // Simulate validation
    if (credentials.email && credentials.password) {
      return {
        user: { ...mockUser, email: credentials.email },
        tokens: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        },
      };
    }
    
    throw new ApiError(401, 'Invalid credentials');
  },

  /**
   * Register a new user
   */
  async signup(data: SignupFormData): Promise<AuthResponse> {
    // TODO: Replace with real API call
    // const { data: response } = await api.post<AuthResponse>('/auth/register', data);
    // return response;

    await simulateDelay(1500);
    
    return {
      user: { ...mockUser, email: data.email, name: data.name },
      tokens: {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      },
    };
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    // TODO: Replace with real API call
    // await api.post('/auth/logout');
    
    await simulateDelay(500);
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
    // TODO: Replace with real API call
    // const { data } = await api.get<User>('/auth/me');
    // return data;

    await simulateDelay(500);
    return mockUser;
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
    // TODO: Return OAuth redirect URL from backend
    // const { data } = await api.get<{ url: string }>(`/auth/oauth/${provider}`);
    // return data.url;

    // Mock - would redirect to OAuth provider
    return `https://oauth.example.com/${provider}`;
  },
};

export default authService;
