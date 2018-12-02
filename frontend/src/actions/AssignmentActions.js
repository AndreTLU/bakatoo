import * as types from '../constants/ActionTypes';
import axios from 'axios';
import Api from '../utils/api';
//import { clearToken, setToken } from '../utils/jwt';

const BASE_URL = '/api';
const token = localStorage.jwt;
export function fetchReposSuccess(data){
  return {type: types.FETCH_REPOS_SUCCESS, payload: data};
}
export function fetchAssignmentsSuccess(data){
  return {type: types.FETCH_ASSIGNMENTS_SUCCESS, payload: data};
}
export function fetchAssignmentSuccess(data){
  return {type: types.FETCH_ASSIGNMENT_SUCCESS, payload: data};
}
export function fetchReposFailure(data){
  return {type: types.FETCH_REPOS_FAILURE, payload: data};
}
export function saveAssignmentSuccess(data){
  return {type: types.SAVE_ASSIGNMENT_SUCCESS, payload: data};
}
export function saveAssignmentFailure(data){
  return {type: types.SAVE_ASSIGNMENT_FAILURE, payload: data};
}

export const fetchRepos = (id, callback) => dispatch => {
  dispatch({ type: types.FETCH_REPOS });
  Api('GET', '/repos/'+id, {})
    .then((assignments) => {
      console.log(assignments);
      dispatch(fetchReposSuccess(assignments));
      if(callback !=null){
        callback(assignments);
      }
    })
    .catch(err =>{
      dispatch(fetchReposFailure(err));
    });
};

export const fetchAssignments = slug => dispatch => {
  dispatch({ type: types.FETCH_ASSIGNMENTS });
  Api('GET', '/assignments/'+slug, {})
    .then((assignments) => {
      dispatch(fetchAssignmentsSuccess(assignments));
      if(callback !=null){
        callback(assignments);
      }
    })
    .catch(err =>{
      
    });
}

export const fetchAssignment = slug => dispatch => {
  dispatch({ type: types.FETCH_ASSIGNMENT });
  Api('GET', '/assignment/'+slug, {})
    .then((assignment) => {
      dispatch(fetchAssignmentSuccess(assignment));
      if(callback !=null){
        callback(assignment);
      }
    })
    .catch(err =>{
      
    });
}

export const saveAssignment = (assignment, subject) => dispatch => {
  dispatch({ type: types.SAVE_SUBJECT });
  Api('POST', '/assignments/', {data: {assignment, subject}})
    .then((response) => {
      dispatch(saveAssignmentSuccess(response));
      if(callback !=null){
        callback(response);
      }
    })
    .catch(err =>{
      dispatch(saveAssignmentFailure(err));
    }); 
};