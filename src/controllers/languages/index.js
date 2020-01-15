import axios from '../api.js';

function errored(bool) {
  return {
    type: 'LANGUAGES_ERRORED',
    errored: bool,
  };
}
function isLoading(bool) {
  return {
    type: 'LANGUAGES_LOADING',
    isLoading: bool,
  };
}

function FetchDataSuccess(data) {
  return {
    type: 'LANGUAGES_FETCH_DATA_SUCCESS',
    data,
  };
}
function setCurrentLanguage(language) {
  return {
    type: 'SET_CURRENT_LANGUAGE',
    language,
  };
}

export function setLanguage(language) {
  return dispatch => {
    dispatch(setCurrentLanguage(language));
  };
}

export function fetchLanguages(url, params = {}) {
  return dispatch => {
    dispatch(isLoading(true));
    return axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(response => {
        dispatch(isLoading(false));
        dispatch(FetchDataSuccess(response.data));
        return response.data;
      })
      .catch(res => {
        dispatch(errored(true));
        dispatch(isLoading(false));
      });
  };
}
