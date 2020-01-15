import { combineReducers } from 'redux';
import developers from './trends';
import languages from './languages';

export default combineReducers({
  developers,
  languages,
});
