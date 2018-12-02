import * as types from '../constants/ActionTypes';
import axios from 'axios';
import Api from '../utils/api';
//import { clearToken, setToken } from '../utils/jwt';

const BASE_URL = '/api';
const token = localStorage.jwt;
export function loadSubjectsSuccess(data){
  return {type: types.LOAD_SUBJECTS_SUCCESS, data};
}

export function saveSubjectSuccess(){
  return {type: types.SAVE_SUBJECT_SUCCESS};
}

export const saveSubject = subject => {
  return function action(dispatch){
    const request = Api('POST', '/subjects/', {data:subject});

    return request.then(
      response => dispatch(saveSubjectSuccess()),
      err => console.log(err.data)
    )
  }
  
  
};