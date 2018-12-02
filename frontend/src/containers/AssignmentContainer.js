import { connect } from 'react-redux';
import Assignment from '../components/Assignment';
import { fetchAssignment } from '../actions/AssignmentActions';
import { fetchWorks } from '../actions/WorkActions';

const mapStateToProps = state => ({
  subjectList: state.subject.subjectList,
  activeSubject: state.subject.activeSubject,
  activeAssignment: state.assignment.activeAssignment,
  workList: state.work.workList
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAssignment : (callback) => {
      dispatch(fetchAssignment(props.match.params.slug, callback));
    },
    fetchWorks: () =>{
      dispatch(fetchWorks(props.match.params.slug));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Assignment);
