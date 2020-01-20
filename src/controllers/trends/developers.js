// we have put interceptors in the common axios function, that is there in ../api.js file
import axios from '../api';

// all routes are defined in utils/Routes.js and exported from utils directory
import { TRENDING_DEVELOPERS_API } from '../../utils/';

// private functions to this file that don't get called from outside
function errored(bool) {
  return { type: 'DEV_ERRORED', errored: bool };
}
function isLoading(bool) {
  return { type: 'DEV_LOADING', isLoading: bool };
}
function FetchDataSuccess({ data, language, since }) {
  return { type: 'DEV_FETCH_DATA_SUCCESS', data, language, since };
}

// fetch all developers with given filters API
// TRENDING_DEVELOPERS_API is defined in utils/Routes.js
export function fetchData() {
  return async (dispatch, getState) => {
    // read current language and trend period from redux
    const { currentLanguage, trendingPeriod } = getState().filters,
      language = currentLanguage.value,
      since = trendingPeriod.value;

    // set loading to true in redux
    dispatch(isLoading(true));

    // we can use promises or async-await, both are non blocking,
    // I personally perfer async await due to brevity
    try {
      const response = await axios.get(TRENDING_DEVELOPERS_API, { params: { language, since } });

      dispatch(isLoading(false));
      dispatch(FetchDataSuccess({ data: response.data, language: currentLanguage.label, since }));
      return response.data;
    } catch (res) {
      dispatch(errored(true));
      dispatch(isLoading(false));
    }
  };
}
