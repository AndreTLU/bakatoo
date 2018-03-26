import * as types from '../constants/ActionTypes'
import Api from '../utils/api'
import { clearToken, setToken } from '../utils/jwt'

export const checkUser = () => {
    return dispatch => {
        dispatch( {type: types.AUTH_START})

        Api('GET', '/users/me', {})
            .then(data =>{
                console.log(data)
                const { user, token } = data
                console.log('test')
                dispatch({ type: types.AUTH_LOADED, user})
            })
            .catch(()=>{
                clearToken()
                return dispatch({ type: types.AUTH_INIT})
            })
    }
}

export const logout = () => dispatch => {
    const completeLogout = () => dispatch => {
        clearToken()
        dispatch({ type: types.AUTH_INIT})
    }

    return Api('POST', '/auth/logout', {})
        .then(() => {
            dispatch(completeLogout())
        })
        .catch(() => {
            console.log('already logged out')
            dispatch(completeLogout())
        })
}