import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { login, reset, forgot, current } from 'api/user'
import { RootState } from 'types/store';
import { UserForgot, UserLogin, UserRest, UserState } from './types';

const initialState: UserState = {
  userLoading: false,
  userInfo: {},
}

export const userLogin = createAsyncThunk(
  'user/login',
  async (params: UserLogin) => {
    setLoading(true);
    const { data: res} = await login(params);
    // The value we return becomes the `fulfilled` action payload
    if (res.errno === 0) {
      message.success('登录成功');
      // this should save basic userinfo in global state
      // setTimeout(() => { window.location.reload(); }, 1000);
      // setTimeout(() => window.location.href = '/', 1000);
    }
    setLoading(false);
    return res.data;
  }
);

export const userReset = createAsyncThunk(
  'user/reset',
  async (params: UserRest) => {
    const { data: res} = await reset(params);
    if (res.errno === 0) {
      message.success('新密码设置成功');
      setTimeout(() => window.location.href = '/admin', 1000);
    }
    // The value we return becomes the `fulfilled` action payload
    return res;
  }
);

export const userFogot = createAsyncThunk(
  'user/forgot',
  async (params: UserForgot) => {
    const { data: res} = await forgot(params);
    if (res.errno === 0) {
      message.success('重置密码邮件发送成功');
    }
    // The value we return becomes the `fulfilled` action payload
    return res;
  }
);

export const userCurrent = createAsyncThunk(
  'user/current',
  async () => {
    const {data: res} = await current();
    return res.data;
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
    // login(params: {username: string, password: string}): void {
      
    // },
    // forgot(params: any) {
      
    // },
    // reset(params: any) {
     
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      // state.userLoading = true;
    }).addCase(userLogin.fulfilled, (state, action) => {
      // state.userLoading = false;
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      setTimeout(() => { window.location.reload(); }, 1000);
    })
    // get current
    builder.addCase(userCurrent.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    })
  }
})

export const { setLoading } = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLoading = (state: RootState) => state.login.userLoading;
export const selectUserInfo = (state: RootState) => state.login.userInfo;

export default loginSlice.reducer;
