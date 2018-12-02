import { connect } from 'react-redux';
import GradeHomework from '../components/GradeHomework';
import { fetchHomeworkBySlug, gradeHomework } from '../actions/WorkActions';

const mapStateToProps = state => ({
  subjectList: state.subject.subjectList,
  activeSubject: state.subject.activeSubject,
  assignmentList: state.assignment.assignmentList,
  activeWork: state.work.activeWork
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchHomework : (callback) => {
      dispatch(fetchHomeworkBySlug(props.match.params.slug, callback));
    },
    gradeHomework : (data) =>{
      dispatch(gradeHomework(data));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GradeHomework);
