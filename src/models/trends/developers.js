// for easy localization, put data in single place
import { en } from '../../utils';

// has the API errored or not
export function errored(state = false, action) {
  switch (action.type) {
    case 'DEV_ERRORED':
      return action.errored;
    default:
      return state;
  }
}

// is the API loading, or finished
export function isLoading(state = false, action) {
  switch (action.type) {
    case 'DEV_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

// data
export function data(state = [], action) {
  switch (action.type) {
    case 'DEV_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

// alert text to display. If this is there, data shouldn't be there
export function alert(state = null, action) {
  switch (action.type) {
    case 'DEV_FETCH_DATA_SUCCESS':
      return action.data.length === 0
        ? en({ since: action.since, language: action.language }).noData
        : null;
    case 'DEV_LOADING':
      return en().loading;
    case 'DEV_ERRORED':
      return en().errored;
    default:
      return state;
  }
}
