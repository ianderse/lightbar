import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import initialState from './initialState';
import reducers from '../reducers';

const logger = createLogger();

const middleware = applyMiddleware(
  thunk,
  logger
);

const store = createStore(
  reducers,
  initialState,
  middleware
);

export default store;
