import { PayloadUser } from '@/types/user';
import { create } from 'zustand';

type UserState = {
  user: PayloadUser | null;
  setUser: (data: PayloadUser) => void;
  resetUser: () => void;
};

const useUserState = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
  resetUser: () => set((state) => ({ ...state, user: null }))
}));

export default useUserState;
