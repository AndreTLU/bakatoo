import * as types from '../constants/ActionTypes';
import Api from '../utils/api';

const token = localStorage.jwt;

export function fetchWorksSuccess(data){
  return {type: types.FETCH_WORKS_SUCCESS, payload: data};
}

export function fetchWorkSucccess(data){
  return {type: types.FETCH_WORK_SUCCESS, payload: data};
}

export const fetchWorks = slug => dispatch => {
  dispatch({ type: types.FETCH_WORKS });
  Api('GET', '/works/'+slug, {})
    .then((works) => {
      dispatch(fetchWorksSuccess(works));
      if(callback !=null){
        callback(works);
      }
    })
    .catch(err =>{
      
    });
}
export const fetchStudentWorks = () => dispatch => {
  dispatch({ type: types.FETCH_WORKS });
  Api('GET', '/works/', {})
    .then((works) => {
      dispatch(fetchWorksSuccess(works));
      if(callback !=null){
        callback(works);
      }
    })
    .catch(err =>{
      
    });
}

export const fetchHomeworkBySlug = (slug, callback) => dispatch => {
  dispatch({ type: types.FETCH_WORK });
  Api('GET', '/work/'+slug, {})
    .then((response) => {
      console.log(response);
      dispatch(fetchWorkSucccess(response));
      if(callback !=null){
        callback(response);
      }
    })
    .catch(err =>{
      
    }); 
}

export const gradeHomework = (data) => dispatch =>{
  dispatch({ type: types.GRADE_WORK });
  console.log(data);
  Api('PUT', '/work/',{data})
    .then((response) =>{
      console.log(response);
    })
}