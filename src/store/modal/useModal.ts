import { create } from 'zustand';

type ModalState = {
  isOpen: boolean;
  payload: any;
  toggleModal: () => void;
};

const useModal = create<ModalState>((set) => ({
  isOpen: true,
  payload: null,
  toggleModal: () => set((state) => ({ ...state, isOpen: !state.isOpen }))
}));

export default useModal;
