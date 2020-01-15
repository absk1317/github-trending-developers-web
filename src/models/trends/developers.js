export function errored(state = false, action) {
  switch (action.type) {
    case 'ERRORED':
      return action.errored;
    default:
      return state;
  }
}
export function isLoading(state = false, action) {
  switch (action.type) {
    case 'LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function data(state = [], action) {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
