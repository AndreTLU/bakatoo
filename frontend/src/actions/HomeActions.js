import * as types from '../constants/ActionTypes'
import Api from '../utils/api'
//import { clearToken, setToken } from '../utils/jwt'

export const getSubjects = () => dispatch => {
    Api('GET', '/orgs/', {})
        .then(data => dispatch({
            type: types.SUBJECTS_LOADED,
            subjects: data
        }))
        .catch(err =>{
            console.log(err)
        })

    
}