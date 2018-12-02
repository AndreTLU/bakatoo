import * as types from '../constants/ActionTypes';
import axios from 'axios';
import Api from '../utils/api';
//import { clearToken, setToken } from '../utils/jwt';

const BASE_URL = '/api';
const token = localStorage.jwt;

export function saveSubjectSuccess(response){
  return {type: types.SAVE_SUBJECT_SUCCESS, payload: response};
}

export function fetchSubjectSuccess(response){
  return {type: types.FETCH_SUBJECT_SUCCESS, payload: response};
}


export const saveSubject = subject => dispatch => {
  dispatch({ type: types.SAVE_SUBJECT });
  Api('POST', '/subjects/', {data: subject})
    .then((response) => {
      dispatch(saveSubjectSuccess(response));
      if(callback !=null){
        callback(response);
      }
    })
    .catch(err =>{
      
    }); 
};

export const fetchSubject = id => dispatch => {
  dispatch({ type: types.FETCH_SUBJECT });
  Api('GET', '/subject/'+id, {})
    .then((response) => {
      dispatch(fetchSubjectSuccess(response));
      if(callback !=null){
        callback(response);
      }
    })
    .catch(err =>{
      
    }); 
}

export const fetchSubjectBySlug = (slug, callback) => dispatch => {
  dispatch({ type: types.FETCH_SUBJECT });
  Api('GET', '/subject/slug/'+slug, {})
    .then((response) => {
      dispatch(fetchSubjectSuccess(response));
      if(callback !=null){
        callback(response);
      }
    })
    .catch(err =>{
      
    }); 
}