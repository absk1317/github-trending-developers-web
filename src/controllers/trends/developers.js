import axios from '../api.js';

export function errored(bool) {
  return {
    type: 'ERRORED',
    errored: bool,
  };
}
export function isLoading(bool) {
  return {
    type: 'LOADING',
    isLoading: bool,
  };
}
export function FetchDataSuccess(data) {
  return {
    type: 'FETCH_DATA_SUCCESS',
    data,
  };
}

export function fetchData(url, params = {}) {
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
