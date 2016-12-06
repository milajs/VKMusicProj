import { PLAY_AUDIO } from '../constants';

export function togglePlay(status) {
  return {
    type: PLAY_AUDIO,
    payload: status
  }
}
