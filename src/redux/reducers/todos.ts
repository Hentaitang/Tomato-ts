import { INIT_TODO, UPDATE_TODO, ADD_TODO, EDIT_TODO } from '../actionTypes';

export default function(state: any[] = [], action: any) {
  switch (action.type) {
    case INIT_TODO:
      return action.payload;
    case UPDATE_TODO:
      return state.map(n => {
        if (n.id === action.payload.id) {
          return { ...action.payload, edit: false };
        } else {
          return n;
        }
      });
    case ADD_TODO:
      return [action.payload, ...state];
    case EDIT_TODO:
      return state.map(n => {
        if (n.id === action.payload) {
          return { ...n, edit: true };
        } else {
          return { ...n, edit: false };
        }
      });
    default:
      return state;
  }
}
