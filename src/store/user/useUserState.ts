import { create } from 'zustand';
import { PayloadUser } from '@/types/user';
import { persist } from 'zustand/middleware';

type UserState = {
  user: PayloadUser | null;
  setUser: (data: PayloadUser) => void;
  resetUser: () => void;
};

const useUserState = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set((state) => ({ ...state, user })),
      resetUser: () => set((state) => ({ ...state, user: null }))
    }),
    {
      name: 'crown-auth'
    }
  )
);

export default useUserState;
