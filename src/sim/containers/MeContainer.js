import { connect } from 'react-redux'
import { setPerson } from '../store/actions'

import MeView from '../components/MeView';

const mapStateToProps = state => {
  return {
  	person: state.person
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: (what,value) => {
      dispatch( setPerson(what, value) )
    }
  }
}

const MeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MeView)

export default MeContainer