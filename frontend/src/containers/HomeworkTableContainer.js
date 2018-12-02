import { connect } from 'react-redux';
import HomeworkTable from '../components/HomeworkTable';
import { fetchStudentWorks } from '../actions/WorkActions';

const mapStateToProps = state => ({
  workList: state.work.workList
});

const mapDispatchToProps = dispatch => {
  return {
    fetchStudentWorks: () => {
      dispatch(fetchStudentWorks());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeworkTable);
