import { LOG_IN, LOG_OUT, GET_USER_DATA, LOAD_AUDIOS, CHANGE_AUDIO, PLAY_AUDIO } from '../constants';

const initialState = {
  user: {},
  isAuth: false,
  audioList: [],
  listType: ``,
  currentAudio: {},
  isPlaying: false,
};

export default function page(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isAuth: true }
    case LOG_OUT:
      return { ...state, isAuth: false, user: {} }
    case GET_USER_DATA:
      return { ...state, user: action.payload }
    case LOAD_AUDIOS:
      return { ...state, audioList: action.payload }
    case CHANGE_AUDIO:
      return { ...state, currentAudio: action.payload.audio, isPlaying: action.payload.isPlaying }
    case PLAY_AUDIO:
      return { ...state, isPlaying: action.payload }
    default:
      return state;
} }
