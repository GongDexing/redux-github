/*jshint esversion:6*/
export function putLocal(key, json){
  localStorage.setItem(key, JSON.stringify(json));
}
export function getLocal(key, nextPage = 1, perPage = 12){
  let users = JSON.parse(localStorage.getItem(key));
  let start = (nextPage - 1) * perPage;
  if(users && users.items && users.items.length > start){
    let items = users.items.slice(start, start + perPage);
    return Object.assign({}, {
      total_count: users.total_count,
      items
    });
  }
  return null;
}
