import axios from '../api.js';
import { LANGUAGES_FETCH_API } from '../../utils';

// private functions to this file that don't get called from outside
function FetchDataSuccess(data) {
  return { type: 'LANGUAGES_FETCH_DATA_SUCCESS', data };
}

function setCurrentLanguage(language) {
  return { type: 'SET_CURRENT_LANGUAGE', language };
}
function setCurrentTrendingPeriod(trendingPeriod) {
  return { type: 'SET_CURRENT_TRENDING_PERIOD', trendingPeriod };
}

// public functions
export function setLanguage(language) {
  return dispatch => dispatch(setCurrentLanguage(language));
}

export function setTrendingPeriod(trendingPeriod) {
  return dispatch => dispatch(setCurrentTrendingPeriod(trendingPeriod));
}

// fetch all languages API
// LANGUAGES_FETCH_API is defined in utils/Routes.js
export function fetchLanguages() {
  return async dispatch => {
    try {
      const response = await axios.get(LANGUAGES_FETCH_API);
      dispatch(FetchDataSuccess(response.data));
      return response.data;
    } catch (res) {}
  };
}
