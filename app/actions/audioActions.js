import { LOAD_AUDIOS } from '../constants';

export function getAudioList(array) {
  return {
    type: LOAD_AUDIOS,
    payload: array,
  }
}
