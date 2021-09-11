import { get, post } from 'utils/http'

export function getSelectLast() {
  return get('/post?type=lastest');
}

export function getSystemInfo() {
  return get('/system');
}

// 更新系统
export function postUpdateSystem(step: number) {
  return post('/system?method=update&step=' + step);
}

export function getSysOptions() {
  return get('/options');
}
