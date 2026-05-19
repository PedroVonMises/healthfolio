import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  hasSeenWelcomeToast: boolean;
  setHasSeenWelcomeToast: (value: boolean) => void;
  // Outros estados globais podem ser adicionados aqui
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasSeenWelcomeToast: false,
      setHasSeenWelcomeToast: (value) => set({ hasSeenWelcomeToast: value }),
    }),
    {
      name: 'healthfolio-storage', // Nome da chave no localStorage
    }
  )
);
