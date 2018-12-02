import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {workList: { works: [], error: null, loading: true},
                        newWork: { work: null, error: null, loading: true},
                        activeWork: { work: null, error: null, loading: true}                      
                      };

export default function (state = INITIAL_STATE, action){
  let error;
  switch(action.type){
    case types.FETCH_WORK:
      return { ...state, activeWork: {work:null, error: null, loading:true }}
    case types.FETCH_WORK_SUCCESS:
      return { ...state, activeWork: {work: action.payload, error: null, loading:false }}
    case types.FETCH_WORKS:
      return { ...state, workList: {works:[], error: null, loading:true }}
    case types.FETCH_WORKS_SUCCESS:
      return { ...state, workList: {works: action.payload, error: null, loading:false }}
    case types.GRADE_WORK:
      return { ...state, newWork: { work: null, error: null, loading: true} }
    case types.GRADE_WORK_SUCCESS:
      return { ...state, newWork: { work: action.payload, error: null, loading: false} }
    default:
      return { ...state }
  }
};
