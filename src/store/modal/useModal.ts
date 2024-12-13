import { create } from 'zustand';

type ModalState = {
  isOpen: boolean;
  payload: any;
  toggleModal: (payload?: any) => void;
};

const useModal = create<ModalState>((set) => ({
  isOpen: false,
  payload: null,
  toggleModal: (payload?: any) =>
    set((state) => ({
      ...state,
      isOpen: !state.isOpen,
      payload: payload ?? null
    }))
}));

export default useModal;
