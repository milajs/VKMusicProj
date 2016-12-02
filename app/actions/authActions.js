import { LOG_IN, LOG_OUT } from '../constants';

export function logIn(status) {
  return {
    type: LOG_IN,
  }
}

export function logOut(status) {
  return {
    type: LOG_OUT,
  }
}
