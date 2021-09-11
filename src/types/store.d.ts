import { ThunkAction, Action } from '@reduxjs/toolkit';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export type AppStore = {
  dashBoardStore: any;
  loginStore: any;
  userStore: any;
  postStore: any;
  categoryStore: any;
  sharedStore: any;
  pushStore: any;
  pageStore: any;
  articleStore: any;
}