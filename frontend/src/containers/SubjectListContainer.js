import { connect } from 'react-redux';
import SubjectList from '../components/SubjectList';
import { loadSubjects } from '../actions/HomeActions'

const mapStateToProps = state => ({
  subjectList: state.subject.subjectList
});

const mapDispatchToProps = dispatch => {
  return {
    loadSubjects: () => {
      dispatch(loadSubjects());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList);
