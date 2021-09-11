import { DashBoardState } from './types';
import { getSelectLast, getSystemInfo, postUpdateSystem } from 'api/sys'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostInfo } from 'types/post';
import { RootState } from 'types/store';
import { SystemInfo } from 'types/shared';

export const UPDATE_STEPS: Array<[number, string, string]> = [
  [1, '正在下载 Firekylin 最新版本...', 'Firekylin 下载成功！'],
  [2, '正在解压更新文件...', '文件更新成功！'],
  [3, '正在重新安装依赖...', '依赖安装成功！'],
  [4, '正在重启程序...', '程序重启成功，将在 %d 秒后刷新页面！']
];

export const COUNT_DOWN = 3;

const initialState: DashBoardState = {
  posts: [],
  systemInfo: {
    config: {},
    count: {
      cates: 0,
      comments: 0,
      posts: 0,
    },
    versions: {
      platform: '',
      nodeVersion: '',
      v8Version: '',
      mysqlVersion: '',
      thinkjsVersion: '',
      firekylinVersion: '',
      needUpdate: ''
    }
  },
  step: 1,
  downCount: COUNT_DOWN,
}

export const selectLastAsync = createAsyncThunk(
  'dashboard/last',
  async () => {
    const { data: res } = await getSelectLast();
    if (res.errno === 0) {
      return res.data;
    }
    return [];
  }
);

export const systemInfoAsync = createAsyncThunk(
  'dashboard/info',
  async () => {
    const { data: res } = await getSystemInfo();
    if (res.errno === 0) {
      // setSystemInfo(res.data);
      return res.data;
    }
    return initialState.systemInfo;
  }
);

// how call self?
export const updateSystemAsync = createAsyncThunk(
  'dashboard/update',
  async (step: number) => {
    const { data: res } = await postUpdateSystem(step);
    if (res.errno === 0) {
      if (step <= UPDATE_STEPS.length) {
        setStep(step + 1);
        // call self
        // so how?
      }
      if (step > UPDATE_STEPS.length) {
        setTimeout(window.location.reload.bind(window.location), COUNT_DOWN * 1000);
        setInterval(() => setDownCount(), 1000);
      }
    }
    // The value we return becomes the `fulfilled` action payload
    return res;
  }
)
// call self
// export const incrementIfOdd = (amount: number): AppThunk => (
//   dispatch,
//   getState
// ) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostInfo[]>) => {
      state.posts = action.payload;
    },
    setSystemInfo: (state, action: PayloadAction<SystemInfo>) => {
      state.systemInfo = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setDownCount: (state) => {
      state.downCount = Math.max(0, --state.downCount);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSystemAsync.fulfilled, (state, action) => {
        const { errno } = action.payload;
        if (errno === 0) {
          if (state.step <= UPDATE_STEPS.length) {
            // setStep(state.step + 1);
            state.step += 1;
            // call self
            // so how?
            updateSystemAsync(state.step);
          }
          if (state.step > UPDATE_STEPS.length) {
            setTimeout(window.location.reload.bind(window.location), COUNT_DOWN * 1000);
            setInterval(() => {
              state.downCount = Math.max(0, --state.downCount);
            }, 1000);
          }
        }
      })
      .addCase(selectLastAsync.fulfilled, (state, action) => {
        // state.posts = action.payload;
        console.log(state.posts, action.payload);
      }).addCase(systemInfoAsync.fulfilled, (state, action) => {
        // state.systemInfo = action.payload;
      });
  },
});

export const { setPosts, setSystemInfo, setStep, setDownCount } = dashboardSlice.actions;

export const selectPosts = (state: RootState) => state.dashboard.posts;
export const systemInfo = (state: RootState) => state.dashboard.systemInfo;
export const selectStep = (state: RootState) => state.dashboard.step;
export const downCount = (state: RootState) => state.dashboard.downCount;

export const selectVersions = (state: RootState) => state.dashboard.systemInfo.versions;
export const selectCount = (state: RootState) => state.dashboard.systemInfo.count;

export default dashboardSlice.reducer;