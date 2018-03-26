import { combineReducers } from 'redux'

import home from './HomeReducers'
import auth from './AuthReducers'

const rootReducer = combineReducers({
home, auth
})

export default rootReducer