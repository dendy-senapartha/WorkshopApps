/*
Logging section
*/
export default ({ getState }) => next => (action) => {
  const rs = next(action);
  console.group();
  console.log('before', getState());
  console.log('action', action);
  
  console.log('after', getState());
  console.groupEnd();
  return rs;
};
