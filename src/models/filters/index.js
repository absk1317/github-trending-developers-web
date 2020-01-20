import { combineReducers } from 'redux';

const initialLanguages = [{ value: null, label: 'Select any Language' }];

// all languages
function languages(state = initialLanguages, action) {
  switch (action.type) {
    case 'LANGUAGES_FETCH_DATA_SUCCESS':
      // API returns data as [{code, label}, ...]
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

// current language out of all
function currentLanguage(state = initialLanguages[0], action) {
  switch (action.type) {
    case 'SET_CURRENT_LANGUAGE':
      return action.language;
    default:
      return state;
  }
}

// all trending periods
function trendingPeriods() {
  return [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];
}

// current trend out of all
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
