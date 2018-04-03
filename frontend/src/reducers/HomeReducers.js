import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
    subjects: [],
    loading: true
}

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case types.SUBJECTS_LOADED: {
            const { subjects } = action
            return {
                ...state,
                subjects,
                loading: false
            }
        }
        default:
            return {
                ...state
            }
    }
}