import { LOADING } from '../actionTypes';

export default function(state: boolean = false, action: any) {
  switch (action.type) {
    case LOADING:
      return action.payload;
    default:
      return state;
  }
}
