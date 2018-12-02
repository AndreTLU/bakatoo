import { combineReducers } from 'redux';

import HomeReducer from './HomeReducers';
import SubjectReducer from './SubjectReducers';
import AssignmentReducers from './AssignmentReducers';
import WorkReducers from './WorkReducers';
import auth from './AuthReducers';

const rootReducer = combineReducers({
subject: SubjectReducer,
assignment: AssignmentReducers,
work: WorkReducers, 
auth
});

export default rootReducer;