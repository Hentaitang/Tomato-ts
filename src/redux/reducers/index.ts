import { combineReducers } from 'redux';
import Todos from './todos';
import Loading from './loading';
import Tomatoes from './tomatoes';

export default combineReducers({ Todos, Loading, Tomatoes });
