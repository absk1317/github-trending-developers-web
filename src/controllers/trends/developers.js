import axios from '../api';
import { TRENDING_DEVELOPERS_API } from '../../utils/';

function errored(bool) {
  return { type: 'DEV_ERRORED', errored: bool };
}
function isLoading(bool) {
  return { type: 'DEV_LOADING', isLoading: bool };
}
function FetchDataSuccess({ data, language, since }) {
  return { type: 'DEV_FETCH_DATA_SUCCESS', data, language, since };
}

export function fetchData() {
  return (dispatch, getState) => {
    const { currentLanguage, trendingPeriod } = getState().filters,
      language = currentLanguage.value,
      since = trendingPeriod.value;

    dispatch(isLoading(true));
    return axios
      .get(TRENDING_DEVELOPERS_API, { params: { language, since } })
      .then(response => {
        dispatch(isLoading(false));
        dispatch(FetchDataSuccess({ data: response.data, language: currentLanguage.label, since }));
        return response.data;
      })
      .catch(res => {
        dispatch(errored(true));
        dispatch(isLoading(false));
      });
  };
}
