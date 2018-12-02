import { connect } from 'react-redux';
import AddSubject from '../components/AddSubject';
import { loadGithubOrgs } from '../actions/HomeActions';
import { saveSubject } from '../actions/SubjectActions';
import { types } from 'util';

const mapStateToProps = state => ({
  subjectList: state.subject.subjectList,
  newSubject: state.subject.newSubject
});

const mapDispatchToProps = dispatch => {
  return {
    loadGithubOrgs: () => {
      dispatch(loadGithubOrgs());
    },
    saveSubject: (e) => {
      dispatch(saveSubject(e));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSubject);
