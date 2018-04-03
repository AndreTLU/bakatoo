import { combineReducers } from 'redux'

import home from './HomeReducers'
import auth from './AuthReducers'
import subject from './SubjectReducers'

const rootReducer = combineReducers({
home, auth, subject
})

export default rootReducer