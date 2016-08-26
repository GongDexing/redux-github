/*jshint esversion:6*/
export default function tip(state = false, action){
  switch(action.type){
    case 'TIP_STATUS':
      return action.status;
    default:
      return state;
  }
}
