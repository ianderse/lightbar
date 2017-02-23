import { combineReducers } from 'redux';

import demo from './posts';
import bluetooth from './bluetooth';

export default combineReducers({
  demo,
  bluetooth
});
