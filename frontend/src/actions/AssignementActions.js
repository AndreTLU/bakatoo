import * as types from '../constants/ActionTypes'
import Api from '../utils/api'

module.exports.getAssignements = slug => dispatch => {
    return Api('GET', '/assignements/'+slug, {})
        .then(data => {
            dispatch({type:'ASSIGNEMENTS_LOADED', data: data})
        })
        .catch(err =>{
            console.log(err)
        })
}
module.exports.getWorks = assign => dispatch => {
    return jsn({d})
}