import { connect } from 'react-redux'
import Home from '../components/Home'

const mapStateToProps = state => ({
    auth: state.auth,
    home: state.home
})

export default connect(mapStateToProps, {})(Home)