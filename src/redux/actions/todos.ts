import { INIT_TODO, UPDATE_TODO, ADD_TODO, EDIT_TODO } from '../actionTypes';

export const initTodo = (payload: any[]) => {
  return {
    type: INIT_TODO,
    payload
  };
};

export const updateTodos = (payload: any) => {
  return {
    type: UPDATE_TODO,
    payload
  };
};

export const addTodo = (payload: any) => {
  return {
    type: ADD_TODO,
    payload
  };
};

export const changeEditing = (payload: number) => {
  return { type: EDIT_TODO, payload };
};
