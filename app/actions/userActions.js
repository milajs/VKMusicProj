import { GET_USER_DATA } from '../constants';

export function getUserData(data) {
  return {
    type: GET_USER_DATA,
    payload: data
  }
}
