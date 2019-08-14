import { combineReducers } from 'redux';
import Todos from './todos';
import Loading from './loading';

export default combineReducers({ Todos, Loading });
