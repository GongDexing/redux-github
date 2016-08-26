/*jshint esversion:6*/
import { combineReducers } from 'redux';
import users from './users';
import fetch from './fetch';
import tip from './tip';
const rootReducer = combineReducers({
  users,
  fetch,
  tip
});

export default rootReducer;
