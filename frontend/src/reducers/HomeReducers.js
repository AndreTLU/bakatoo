import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
    subjects: [],
    loading: true
}

export default function (state = INITIAL_STATE, action){
  switch(action.type){
    case types.LOAD_SUBJECTS_SUCCESS: {
        return {
            ...state,
            subjects:action,
            loading: false
        }
    }
    default:
        return {
            ...state
        }
  }
};
