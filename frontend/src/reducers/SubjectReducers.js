import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
    meta: [],
    data: [],
    title: {},
    loading: true
}

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case types.SUBJECT_LOADED: {
            const { meta } = action
            return {
                ...state,
                meta,
                loading: false
            }
        }
        case 'ASSIGNEMENTS_LOADED': {
            const { data } = action
            return {
                ...state,
                data,
                loading: false
            }
        }
        case 'ASSIGNEMENTS_LOAD_INIT':
            return {
                loading: true
            }
        case types.SUBJECT_NAME_LOAD_INIT: {
            return {
                ...state,
                loading: true
            }
        }
        case types.SUBJECT_NAME_LOADED: {
            const { title } = action
            return {
                ...state,
                title,
                loading: false
            }
        }
        case types.SUBJECT_INIT:
            return INITIAL_STATE

        default:
            return {
                ...state
            }
    }
}