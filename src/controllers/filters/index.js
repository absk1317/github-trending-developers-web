import axios from '../api.js';
import { LANGUAGES_FETCH_API } from '../../utils';

function FetchDataSuccess(data) {
  return { type: 'LANGUAGES_FETCH_DATA_SUCCESS', data };
}

function setCurrentLanguage(language) {
  return { type: 'SET_CURRENT_LANGUAGE', language };
}
function setCurrentTrendingPeriod(trendingPeriod) {
  return { type: 'SET_CURRENT_TRENDING_PERIOD', trendingPeriod };
}

export function setLanguage(language) {
  return dispatch => dispatch(setCurrentLanguage(language));
}

export function setTrendingPeriod(trendingPeriod) {
  return dispatch => dispatch(setCurrentTrendingPeriod(trendingPeriod));
}

export function fetchLanguages() {
  return dispatch => {
    return axios
      .get(LANGUAGES_FETCH_API)
      .then(response => {
        dispatch(FetchDataSuccess(response.data));
        return response.data;
      })
      .catch(res => {});
  };
}
