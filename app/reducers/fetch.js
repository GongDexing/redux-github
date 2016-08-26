/*jshint esversion:6*/
export default function fetch(state = false, action){
  switch(action.type){
    case 'FETCH_STATUS':
      return action.status;
    default:
      return state;
  }
}
