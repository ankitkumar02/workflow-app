import { combineReducers } from 'redux';
import workflows from './workflow-reducer';

const rootReducer = combineReducers({
  workflows
});

export default rootReducer;
