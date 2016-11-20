import { LOG_IN } from '../constants';

export function logIn() {
  return {
    type: LOG_IN,
    payload: true,
  }
}
