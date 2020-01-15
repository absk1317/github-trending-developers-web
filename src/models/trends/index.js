import { combineReducers } from 'redux';
import { data, errored, isLoading } from './developers';
export default combineReducers({
  data,
  errored,
  isLoading,
});
