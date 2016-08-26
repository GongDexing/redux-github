/*jshint esversion:6*/
import { fetchStatus } from './fetch';
import { tipStatus } from './tip';
import { getLocal } from '../local/storage';
export function firstFetchUsers(keyword){
  let cookieUsers = getLocal(keyword);
  return dispatch => {
    if(cookieUsers){
      Promise.resolve()
        .then(() => {
          dispatch(firstLoadUsers(cookieUsers, keyword));
          return cookieUsers.total_count;
        })
        .then((total => dispatch(tipStatus(total === 0 ? true : false))))
        .then(() => dispatch(fetchStatus(false)));
    }else{
      console.log('firstFetchUsers: ' + url(keyword));
      fetch(url(keyword))
        .then(res => res.json())
        .then(json => {
          dispatch(firstLoadUsers(json, keyword));
          return json.total_count;
        })
        .then((total => dispatch(tipStatus(total === 0 ? true : false))))
        .then(() => dispatch(fetchStatus(false)));
    }
  };
}

export function loadMoreUser(){
  return (dispatch, getState) => {
    const { users } = getState();
    const { keyword, nextPage, perPage } = users;
    let cookieUsers = getLocal(keyword, nextPage, perPage);
    if(cookieUsers){
      Promise.resolve()
        .then(() => dispatch(loadMoreUsers(cookieUsers)))
        .then(() => dispatch(fetchStatus(false)));
      return;
    }else{
      console.log('loadMoreUser: ' + url(keyword, nextPage, perPage));
      fetch(url(keyword, nextPage, perPage))
        .then(res => res.json() )
        .then(json => dispatch(loadMoreUsers(json)))
        .then(() => dispatch(fetchStatus(false)));
    }
  };
}

export function firstLoadUsers(users, keyword){
  return {
    type: 'FIRST_LOAD_USERS',
    users,
    keyword
  };
}

export function loadMoreUsers(users){
  return {
    type: 'LOAD_MORE_USERS',
    users
  };
}

export function clearCurrentUsers(){
  return {
    type: 'CLEAR_CURRENT_USERS'
  };
}

function url(keyword, nextPage = 1, perPage = 12){
  return `https://api.github.com/search/users?q=${keyword}&page=${nextPage}&per_page=${perPage}`;
}
