import { ADD_TODO } from '../actionTypes';

export default function(state: any[] = [], action: any) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
}
