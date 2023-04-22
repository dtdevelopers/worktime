import create from 'zustand';
import {AuthService} from '../../services/auth';
import {createJSONStorage, persist} from 'zustand/middleware';
import {IUser} from '../../types/user';

type Credentials = {
  username: string;
  password: string;
};

type AuthState = {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: IUser | null;
    token: string | null;
    authenticate: (credentials: Credentials) => void;
    logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        authenticate: async (credentials: Credentials) => {
            set({isLoading: true});
            const data = await AuthService.authenticate(credentials).catch(() =>
                set({isLoading: false})
            );
            if (data && data.token) {
                set(() => ({
                    isAuthenticated: true,
                    user: data.user,
                    token: data.token
                }));
            }
            set({isLoading: false});
        },
        logout: () => set(() => ({ isAuthenticated: false, user: null, token: null })),
    }),
    {
      name: 'worktime-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
