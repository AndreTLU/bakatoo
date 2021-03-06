import { connect } from 'react-redux';
import Home from '../components/Home';
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
