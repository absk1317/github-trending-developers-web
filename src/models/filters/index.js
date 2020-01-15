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

function currentLanguage(state = {}, action) {
  switch (action.type) {
    case 'SET_CURRENT_LANGUAGE':
      return action.language;
    default:
      return state;
  }
}

function trendingPeriod(state = { value: 'daily', label: 'Daily' }, action) {
  switch (action.type) {
    case 'SET_CURRENT_TRENDING_PERIOD':
      return action.trendingPeriod;
    default:
      return state;
  }
}

function languages(state = [], action) {
  switch (action.type) {
    case 'LANGUAGES_FETCH_DATA_SUCCESS':
      return action.data.map(item => {
        return { value: item.code, label: item.name };
      });
    default:
      return state;
  }
}
function trendingPeriods(
  state = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ],
  action,
) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  languages,
  errored,
  isLoading,
  currentLanguage,
  trendingPeriod,
  trendingPeriods,
});
