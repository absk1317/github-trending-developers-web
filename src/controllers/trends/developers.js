import axios from '../api.js';

function errored(bool) {
  return {
    type: 'DEV_ERRORED',
    errored: bool,
  };
}
function isLoading(bool) {
  return {
    type: 'DEV_LOADING',
    isLoading: bool,
  };
}
function FetchDataSuccess(data) {
  return {
    type: 'DEV_FETCH_DATA_SUCCESS',
    data,
  };
}

export function fetchData(url, params = {}) {
  return dispatch => {
    dispatch(isLoading(true));
    return axios
      .get(
        url,
        { params },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
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
