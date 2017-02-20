import * as types from '../redux/actionTypes';

export const addPost = (post) => {
  return {
    type: types.ADD_POST,
    post
  }
}
