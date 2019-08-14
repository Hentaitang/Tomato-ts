import { LOADING } from '../actionTypes';

export const changeLoading = (payload: boolean) => {
  return {
    type: LOADING,
    payload
  };
};
