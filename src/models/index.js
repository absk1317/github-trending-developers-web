import { combineReducers } from 'redux';
import developers from './trends';
import filters from './filters';

export default combineReducers({
  developers,
  filters,
});
