import { combineReducers } from 'redux';
import { data, errored, isLoading, alert } from './developers';
export default combineReducers({
  data,
  errored,
  isLoading,
  alert,
});
