import { LOG_IN } from '../constants';

export function logIn(status) {
  return {
    type: LOG_IN,
    payload: status,
  }
}
