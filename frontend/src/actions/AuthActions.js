import * as types from '../constants/ActionTypes'
import Api from '../utils/api'
import { clearToken, setToken } from '../utils/jwt'

export const checkUser = () => {
  return dispatch => {
    dispatch( {type: types.AUTH_START})

    Api('GET', '/users/me', {})
      .then(data =>{
        console.log(data);
        const { user, token } = data;
        if(token) setToken(token);
        dispatch({ type: types.AUTH_LOADED, user});
      })
      .catch((err)=>{
        console.log(err);
        //clearToken();
        return dispatch({ type: types.AUTH_FAILED});
      })
  }
}