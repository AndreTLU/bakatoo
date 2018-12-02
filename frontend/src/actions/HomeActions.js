import * as types from '../constants/ActionTypes';
import Api from '../utils/api';
import axios from 'axios';
//import { clearToken, setToken } from '../utils/jwt';
const token = localStorage.jwt;

export function loadSubjectsSuccess(subjects){
  return {type: types.LOAD_SUBJECTS_SUCCESS, payload: subjects};
}
export function loadSubjectsFailure(error){
  return {type: types.LOAD_SUBJECTS_FAILURE, payload: error};
}
export function loadGithubOrgsSuccess(data){
  return {type: types.LOAD_GITHUB_ORGS_SUCCESS, data};
}

export const loadGithubOrgs = (callback) => dispatch => {
  dispatch({ type: types.LOAD_SUBJECTS });
  Api('GET', '/orgs/', {})
    .then((data) => {
      dispatch(loadSubjectsSuccess(data));
      if(callback !=null){
        callback(data);
      }
    })
    .catch(err =>{
      console.log(err);
    });
};

export const loadSubjects = (callback) => dispatch => {
  dispatch({ type: types.LOAD_SUBJECTS });
  Api('GET', '/subjects/', {})
    .then((subjects) => {
      dispatch(loadSubjectsSuccess(subjects));
      if(callback !=null){
        callback(data);
      }
    })
    .catch(err =>{
      loadSubjectsFailure(err);
    });
};
