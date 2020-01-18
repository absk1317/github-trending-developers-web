import { en } from '../../utils';

export function errored(state = false, action) {
  switch (action.type) {
    case 'DEV_ERRORED':
      return action.errored;
    default:
      return state;
  }
}
export function isLoading(state = false, action) {
  switch (action.type) {
    case 'DEV_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function data(state = [], action) {
  switch (action.type) {
    case 'DEV_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

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
