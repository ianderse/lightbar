import { combineReducers } from 'redux';

import bluetooth from './bluetooth';
import account from './account';

export default combineReducers({
  bluetooth,
  account
});
