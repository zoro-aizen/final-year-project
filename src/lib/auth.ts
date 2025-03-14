import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuth = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: (userData: User, token: string) =>
        set({
          user: userData,
          isAuthenticated: true,
          token,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          token: null,
        }),
      updateUser: (userData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const login = async (email: string, password: string) => {
  try {
    // Simulated API call
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    useAuth.getState().login(data.user, data.token);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  useAuth.getState().logout();
};

export const updateUserProfile = async (userData: Partial<User>) => {
  try {
    // Simulated API call
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useAuth.getState().token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Profile update failed');
    }

    const data = await response.json();
    useAuth.getState().updateUser(data);
    return data;
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
};
