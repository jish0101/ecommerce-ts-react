import { create } from 'zustand';

type LoaderState = {
  isLoading: boolean;
  payload?: any;
  toggle: (value?: boolean) => void;
};

const useLoader = create<LoaderState>((set) => ({
  isLoading: false,
  payload: null,
  toggle: (value) =>
    set((state) => ({ ...state, isLoading: value ?? !state.isLoading }))
}));

export default useLoader;
