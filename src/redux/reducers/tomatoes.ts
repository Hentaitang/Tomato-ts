import {
  INIT_TOMATO,
  ADD_TOMATO,
  EDIT_TOMATO,
  UPDATE_TOMATO
} from '../actionTypes';

export default function(state: any[] = [], action: any) {
  switch (action.type) {
    case INIT_TOMATO:
      return action.payload;
    case ADD_TOMATO:
      return [action.payload, ...state];
    case EDIT_TOMATO:
      return state;
    case UPDATE_TOMATO:
      return state.map(n => {
        if (n.id === action.payload.id) {
          return action.payload;
        } else {
          return n;
        }
      });
    default:
      return state;
  }
}
