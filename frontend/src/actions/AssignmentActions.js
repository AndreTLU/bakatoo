import * as types from '../constants/ActionTypes'
import Api from '../utils/api'

module.exports.getAssignments = slug => dispatch => {
    return Api('GET', '/assignments/'+slug, {})
        .then(data => {
            dispatch({type:'ASSIGNMENTS_LOADED', data: data})
        })
        .catch(err =>{
            console.log(err)
        })
}
module.exports.getWorks = assign => dispatch => {
    return jsn({d})
}