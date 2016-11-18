import { GET_USER_DATA } from '../constants';

const initialState = {
  user: {},
  isAuth: false,
  nowPlaying: `anyTreck`,
  recommendations: [],
};

export default function page(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return { ...state, user: action.payload }
    default:
      return state;
} }