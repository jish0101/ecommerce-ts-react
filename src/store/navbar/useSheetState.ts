import { create } from 'zustand';

type SheetState = {
  isOpen: boolean;
  toggleSheet: () => void;
};

const useSheetState = create<SheetState>((set) => ({
  isOpen: false,
  toggleSheet: () => set((state) => ({ isOpen: !state.isOpen }))
}));

export default useSheetState;
