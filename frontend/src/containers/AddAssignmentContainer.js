import { connect } from 'react-redux';
import AddAssignment from '../components/AddAssignment';
import { loadSubjects } from '../actions/HomeActions';
import { fetchRepos, saveAssignment } from '../actions/AssignmentActions';
import { fetchSubject } from '../actions/SubjectActions';
import { types } from 'util';

const mapStateToProps = state => ({
  subjectList: state.subject.subjectList,
  assignmentList: state.assignment.assignmentList,
  activeSubject: state.subject.activeSubject
});

const mapDispatchToProps = dispatch => {
  return {
    loadSubjects: () => {
      dispatch(loadSubjects());
    },
    fetchRepos: (id) => {
      dispatch(fetchRepos(id));
    },
    fetchSubject : (id) => {
      dispatch(fetchSubject(id));
    },
    saveAssignment: (object, subject) => {
      dispatch(saveAssignment(object, subject));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAssignment);
