import { combineReducers } from 'redux';

function errored(state = false, action) {
  switch (action.type) {
    case 'LANGUAGES_ERRORED':
      return action.errored;
    default:
      return state;
  }
}

function isLoading(state = false, action) {
  switch (action.type) {
    case 'LANGUAGES_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

function current(state = 'ruby', action) {
  switch (action.type) {
    case 'SET_CURRENT_LANGUAGE':
      return action.language;
    default:
      return state;
  }
}

function data(state = [], action) {
  switch (action.type) {
    case 'LANGUAGES_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export default combineReducers({
  data,
  errored,
  isLoading,
  current,
});
