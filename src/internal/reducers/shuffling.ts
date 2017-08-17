import { Action } from 'redux';
import { START_SHUFFLE, DONE_SHUFFLING } from '../constants';

export default function isShuffling(status: boolean = false, action: Action): boolean {
  switch (action.type) {
    case START_SHUFFLE:
      return true;
    case DONE_SHUFFLING:
      return false;
    default:
      return status;
  }
}