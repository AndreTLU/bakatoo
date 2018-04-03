import * as types from '../constants/ActionTypes'
import Api from '../utils/api'

import { SUBJECT_SLUG_URL } from '../constants/ApiConstants'

module.exports.getSubject = slug => dispatch => {
    return Api('GET', SUBJECT_SLUG_URL.replace(':slug', slug), {})
        .then(data => {
            dispatch({ type: types.SUBJECT_LOADED, meta: data})
        })
        .catch(err =>{
            console.log(err)
        })
}
module.exports.getSubjectName = slug => dispatch => {
    dispatch({type: types.SUBJECT_NAME_LOAD_INIT})
    return Api('GET', '/orgs/'+slug, {})
        .then(data => {
            dispatch({ type: types.SUBJECT_NAME_LOADED, title: data})
        })
        .catch(err =>{
            console.log(err)
        })
}