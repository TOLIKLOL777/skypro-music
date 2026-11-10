import { AuthUserType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const AUTH_STORAGE_KEY = 'auth_user';

export function extractAuthUser(
  res: unknown,
  fallback: { email: string; username?: string },
): AuthUserType {
  const responseObj = (res ?? {}) as {
    _id?: number;
    email?: string;
    username?: string;
    data?: {
      _id?: number;
      email?: string;
      username?: string;
      user?: Partial<AuthUserType>;
      data?: Partial<AuthUserType>;
    };
  };
  const userPayload =
    responseObj.data?.user ??
    responseObj.data?.data ??
    responseObj.data ??
    responseObj;

  return {
    _id: userPayload?._id,
    username: userPayload?.username || fallback.username,
    email: userPayload?.email || fallback.email,
  };
}

type AuthState = {
  user: AuthUserType | null;
  isAuth: boolean;
  isInitialized: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthUserType>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isInitialized = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuth = false;
      state.isInitialized = true;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setAuth, clearAuth, setInitialized } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
