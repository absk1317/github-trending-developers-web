import { combineReducers } from 'redux';

const initialLanguages = [{ value: null, label: 'Select any Language' }];

function languages(state = initialLanguages, action) {
  switch (action.type) {
    case 'LANGUAGES_FETCH_DATA_SUCCESS':
      return [
        ...initialLanguages,
        ...action.data.map(item => {
          return { value: item.code, label: item.name };
        }),
      ];
    default:
      return state;
  }
}

function currentLanguage(state = initialLanguages[0], action) {
  switch (action.type) {
    case 'SET_CURRENT_LANGUAGE':
      return action.language;
    default:
      return state;
  }
}

function trendingPeriods() {
  return [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];
}

function trendingPeriod(state = trendingPeriods()[0], action) {
  switch (action.type) {
    case 'SET_CURRENT_TRENDING_PERIOD':
      return action.trendingPeriod;
    default:
      return state;
  }
}

export default combineReducers({
  languages,
  currentLanguage,
  trendingPeriod,
  trendingPeriods,
});
