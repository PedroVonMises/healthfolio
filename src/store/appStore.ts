import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Estado global B2B, ex: preferências de navegação ou filtros
  themePreference: 'light' | 'dark' | 'system';
  setThemePreference: (theme: 'light' | 'dark' | 'system') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      themePreference: 'system',
      setThemePreference: (theme) => set({ themePreference: theme }),
    }),
    {
      name: 'healthfolio-storage',
    }
  )
);
