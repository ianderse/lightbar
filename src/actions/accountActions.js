import * as types from '../redux/actionTypes';

export const updateUser = (user) => {
  return {
    type: types.UPDATE_USER,
    user,
  }
}

export const logoutUser = () => {
  return {
    type: types.LOGOUT_USER
  }
}
