import { LOG_IN, GET_USER_DATA, LOAD_AUDIOS } from '../constants';

const initialState = {
  user: {},
  isAuth: false,
  audioList: [],
  currentAudio: {},
};

export default function page(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isAuth: action.payload }
    case GET_USER_DATA:
      return { ...state, user: action.payload }
    case LOAD_AUDIOS:
      return { ...state, audioList: action.payload }
    default:
      return state;
} }
