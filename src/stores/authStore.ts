import { create } from 'zustand';
import api from '@/lib/axios';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  setHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      isLoading: true,

      setHydrated: (state: boolean) => {
        set({ hasHydrated: state })
      },
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (email, password) => {
        try {
          const res = await api.post('/auth/login', { email, password });
          console.log(res.data);
          if (res.data.success) {
            set({ user: res.data.user, isAuthenticated: res.data.user.isVerified });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      register: async (name, email, password) => {
        try {
          const res = await api.post('/auth/register', { name, email, password });
          if (res.data.success) return res.data;
          return false;
        } catch (error) {
          console.error('Register error:', error);
          return false;
        }
      },

      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ user: null, isAuthenticated: false });
        }
      },

      fetchUser: async () => {
        try {
          set({ isLoading: true });
          const res = await api.get('/auth/me');
          if (res.data.user) {
            set({ user: res.data.user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }), {
    name: 'auth-storage',
    partialize: (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    }),
    onRehydrateStorage: () => (state) => {
      state?.setHydrated(true)
    }
  }
  )
);
