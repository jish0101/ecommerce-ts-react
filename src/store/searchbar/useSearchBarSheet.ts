import { create } from 'zustand';

type SheetState = {
  isOpen: boolean;
  toggleSheet: (value?: boolean) => void;
};

const useSearchBarSheet = create<SheetState>((set) => ({
  isOpen: false,
  toggleSheet: (value) =>
    set((state) => ({ isOpen: value !== undefined ? value : !state.isOpen }))
}));

export default useSearchBarSheet;
