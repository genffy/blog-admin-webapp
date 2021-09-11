// import LoginStore from './store.slice';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';
import { User } from 'types/shared';

export interface LoginProps extends FormComponentProps, RouteComponentProps<any> {
    // loginStore: LoginStore;
}

export interface UserForgot {
    user: string; // 找回密码输入的邮件名称
}
export interface UserLogin {
    username: string;
    password: string;
    remember: boolean;
    token?: string | undefined | null;
}

export interface UserRest {
    password: string;
    token: string | undefined | null;
}

export interface UserState {
    userLoading: any;
    userInfo: User | {};
  }