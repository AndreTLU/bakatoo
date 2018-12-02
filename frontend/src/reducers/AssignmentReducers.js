import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {assignmentList: { assignments: [], error: null, loading: true},
                        newAssignment: { assignment: null, error: null, loading: true},
                        activeAssignment: { assignment: null, error: null, loading: true}                      
                      };

export default function (state = INITIAL_STATE, action){
  let error;
  switch(action.type){
    case types.FETCH_REPOS:
      return { ...state, assignmentList: {assignments:[], error: null, loading:true }}
    case types.FETCH_REPOS_SUCCESS:
      return { ...state, assignmentList: {assignments: action.payload, error: null, loading:false }}
    case types.SAVE_ASSIGNMENT:
      return { ...state, newAssignment: {assignment: action.payload, error: null, loading:true }}
    case types.SAVE_ASSIGNMENT_SUCCESS:
      return { ...state, newAssignment: {assignment: null, error: null, loading:false }}
    case types.FETCH_ASSIGNMENTS:
      return { ...state, assignmentList: {assignments:[], error: null, loading:true }}
    case types.FETCH_ASSIGNMENTS_SUCCESS:
      return { ...state, assignmentList: {assignments: action.payload, error: null, loading:false }}
    case types.FETCH_ASSIGNMENT:
      return { ...state, activeAssignment: { assignment: null, error: null, loading: true}}
    case types.FETCH_ASSIGNMENT_SUCCESS:
      return { ...state, activeAssignment: { assignment: action.payload, error: null, loading: false}}
    default:
      return { ...state }
  }
};
