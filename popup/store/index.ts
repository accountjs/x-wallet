import { create } from 'zustand';

interface Store {
  isShowMoney: boolean;
  setIsShowMoney: () => void;
}

export const useConfigStore = create<Store>((set) => ({
  isShowMoney: true,
  setIsShowMoney: () => set((state) => ({ isShowMoney: !state.isShowMoney })),
}));
