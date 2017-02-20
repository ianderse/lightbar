import * as types from '../redux/actionTypes';

const initialState = {
  posts: []
}

function demo (state = initialState, action) {
  switch (action.type) {
    case types.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.post]
      };
    default:
      return state;
  }
}

export default demo;
