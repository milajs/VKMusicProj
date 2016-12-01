import { LOAD_AUDIOS, CHANGE_AUDIO } from '../constants';

export function getAudioList(array) {
  return {
    type: LOAD_AUDIOS,
    payload: array,
  }
}

export function chacgeAudio(audio) {
  return {
    type: CHANGE_AUDIO,
    payload: audio,
  }
}
