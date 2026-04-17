// Better to use a store for window management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WindowState {
  id: string;
  title: string;
  component: string;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  zIndex: number;
}

interface OSStore {
  windows: WindowState[];
  activeZIndex: number;
  openWindow: (id: string, title: string, component: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
}

export const useStore = create<OSStore>()(
  persist(
    (set, get) => ({
      windows: [],
      activeZIndex: 10,
      openWindow: (id, title, component) => {
        const { windows, activeZIndex } = get();
        const existing = windows.find(w => w.id === id);
        if (existing) {
          if (existing.isMinimized) get().minimizeWindow(id);
          get().focusWindow(id);
          return;
        }
        set({
          windows: [...windows, { id, title, component, isOpen: true, isMinimized: false, isFocused: true, zIndex: activeZIndex + 1 }],
          activeZIndex: activeZIndex + 1
        });
      },
      closeWindow: (id) => set((state) => ({ windows: state.windows.filter(w => w.id !== id) })),
      minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w)
      })),
      focusWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isFocused: true, zIndex: state.activeZIndex + 1 } : { ...w, isFocused: false }),
        activeZIndex: state.activeZIndex + 1
      }))
    }),
    {
      name: 'os-portfolio-storage',
    }
  )
);
