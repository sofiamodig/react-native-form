import { combineReducers } from 'redux';

import form from './form';
import countriesList from './countries';

export default combineReducers({
  form,
  countriesList,
});