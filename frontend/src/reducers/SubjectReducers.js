import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {subjectList: { subjects: [], error: null, loading: true},
                        newSubject: { subject: null, error: null, loading: true},
                        activeSubject: { subject: null, error: null, loading: true}                      
                      };

export default function (state = INITIAL_STATE, action){
  let error;
  switch(action.type){
    case types.LOAD_SUBJECTS:
      return { ...state, subjectList: {subjects:[], error: null, loading:true }}
    case types.LOAD_SUBJECTS_SUCCESS:
      return { ...state, subjectList: {subjects: action.payload, error: null, loading:false }}
    case types.SAVE_SUBJECT:
      return { ...state, newSubject: {subject: action.payload, error: null, loading:true }}
    case types.SAVE_SUBJECT_SUCCESS:
      return { ...state, newSubject: {subject: null, error: null, loading:false }}
    case types.FETCH_SUBJECT:
      return { ...state, activeSubject: { subject: null, error: null, loading: true }}
    case types.FETCH_SUBJECT_SUCCESS:
      return { ...state, activeSubject: {subject: action.payload, error: null, loading: false }}
    default:
      return { ...state }
  }
};
