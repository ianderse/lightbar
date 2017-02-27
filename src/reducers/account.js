import * as types from '../redux/actionTypes';

const initialState = {
  user: '',
  loggedIn: false,
}

function account (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER:
      return {
        ...state,
        user: action.user,
        loggedIn: true,
      };
    case types.LOGOUT_USER:
        return {
          ...state,
          user: null,
          loggedIn: false,
        };
    default:
      return state;
  }
}

export default account;
