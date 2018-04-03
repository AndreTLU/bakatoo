import { connect } from 'react-redux'
import Home from '../components/Home'
import { logout } from '../actions/AuthActions'
import { getSubjects } from '../actions/HomeActions'

const mapStateToProps = state => ({
    auth: state.auth,
    home: state.home
})

export default connect(mapStateToProps, { getSubjects })(Home)