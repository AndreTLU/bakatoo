import { connect } from 'react-redux';
import Subject from '../components/Subject';
import { loadSubjects } from '../actions/HomeActions';
import { fetchAssignments, saveAssignment } from '../actions/AssignmentActions';
import { fetchSubjectBySlug } from '../actions/SubjectActions';
import { types } from 'util';

const mapStateToProps = state => ({
  subjectList: state.subject.subjectList,
  activeSubject: state.subject.activeSubject,
  assignmentList: state.assignment.assignmentList,
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchSubject : (callback) => {
      dispatch(fetchSubjectBySlug(props.match.params.slug, callback));
    },
    fetchAssignments: () => {
      dispatch(fetchAssignments(props.match.params.slug));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Subject);
