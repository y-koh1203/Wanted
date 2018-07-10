import { connect } from 'react-redux'

import App from '../components/app'
import {setUser} from '../../actions'

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
    return {

        handleSetName: (name) => { 
            dispatch(setUser(name))
        },

        handleSetUserId: (id) => {
            dispatch(setUserId(id))
        }
    }
  }

export default connect(
    mapStateToProps,mapDispatchToProps
)(App)