/*jshint esversion:6*/
const initialState = {
  total_count: 0,
  keyword: '',
  nextPage: 1,
  perPage: 12,
  items: []
};
export default function users(state = initialState, action){
  switch(action.type){
    case 'FIRST_LOAD_USERS':
      return Object.assign({}, state, {
              total_count: action.users.total_count,
              keyword: action.keyword,
              nextPage: state.nextPage + 1,
              items: action.users.items
            });
    case 'LOAD_MORE_USERS':
      return Object.assign({}, state, {
        total_count: action.users.total_count,
        nextPage: state.nextPage + 1,
        items: [...state.items, ...action.users.items]
      });
    case 'CLEAR_CURRENT_USERS':
      return initialState;
    default:
      return state;
  }
}
