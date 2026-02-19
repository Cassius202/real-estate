// src/stores/useThemeStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  mode: ThemeMode;
  isDark: boolean; // computed: true if mode === 'dark'
  setMode: (mode: ThemeMode) => void;
  toggle: () => void; // switches between light ↔ dark
}

// Helper function to get system theme preference
const getSystemTheme = (): ThemeMode => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light'; // Default to light if matchMedia is not available
};

// Define the persisted state shape (only what we save)
interface PersistedState {
  mode: ThemeMode;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      // Initialize with system preference
      mode: getSystemTheme(),
      isDark: getSystemTheme() === 'dark',

      setMode: (mode: ThemeMode) =>
        set({
          mode,
          isDark: mode === 'dark',
        }),

      toggle: () =>
        set((state) => {
          const newMode = state.mode === 'light' ? 'dark' : 'light';
          return {
            mode: newMode,
            isDark: newMode === 'dark',
          };
        }),
    }),
    {
      name: 'theme-mode',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ mode: state.mode }),
      
      // Merge function to properly rehydrate the store
      merge: (persistedState, currentState) => {
        // If no persisted state, use current state (system theme)
        if (!persistedState || typeof persistedState !== 'object') {
          return currentState;
        }

        const saved = persistedState as Partial<PersistedState>;
        
        // Handle legacy 'system' values or invalid modes
        let validMode: ThemeMode;
        if (saved.mode === 'dark' || saved.mode === 'light') {
          validMode = saved.mode;
        } else {
          // Fallback to system theme for invalid values
          validMode = getSystemTheme();
        }

        return {
          ...currentState,
          mode: validMode,
          isDark: validMode === 'dark',
        };
      },
    }
  )
);

// Optional: Add a listener to react to system theme changes
if (typeof window !== 'undefined' && window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Only react if the user hasn't manually set a preference
  mediaQuery.addEventListener('change', (e) => {
    const hasSavedPreference = localStorage.getItem('theme-mode') !== null;
    
    // If user has manually set a preference, don't override it
    if (!hasSavedPreference) {
      const newMode = e.matches ? 'dark' : 'light';
      console.log('System theme changed to:', newMode);
      useThemeStore.setState({ 
        mode: newMode, 
        isDark: newMode === 'dark' 
      });
    }
  });
}