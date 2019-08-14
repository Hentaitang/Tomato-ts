import {
  INIT_TOMATO,
  ADD_TOMATO,
  EDIT_TOMATO,
  UPDATE_TOMATO
} from '../actionTypes';

export const initTomatoes = (payload: any[]) => {
  return {
    type: INIT_TOMATO,
    payload
  };
};

export const updateTomatoes = (payload: any) => {
  return {
    type: UPDATE_TOMATO,
    payload
  };
};

export const addTomato = (payload: any) => {
  return {
    type: ADD_TOMATO,
    payload
  };
};

export const editTomato = (payload: number) => {
  return { type: EDIT_TOMATO, payload };
};
