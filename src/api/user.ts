import { User } from "types/shared";
import md5 from 'md5';
import { get, post } from 'utils/http'

const specialConf = {
  baseURL: process.env.REACT_APP_BASE_URL,
}

// A mock function to mimic making an async request for data
export function login(params: User) {
  params.password = md5(window.SysConfig.options.password_salt + params.password);
  return post('/admin/user/login', params, specialConf);
}


export function forgot(params: any) {
  return post('/admin/user/forgot', params, specialConf)
}

export function reset(params: any) {
  params.password = md5(window.SysConfig.options.password_salt + params.password);
  return post('/admin/user/reset', params, specialConf)
}

export function current() {
  return get('/current');
}