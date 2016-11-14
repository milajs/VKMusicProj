const initialState = {
  user: {},
  userId: 1337,
  nowPlaying: `anyTreck`,
  recommendations: [],
};

export default function page(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER_DATA':
      return { ...state, user: action.payload }
    default:
      return state;
} }
