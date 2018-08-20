import { connect } from 'react-redux'
import { setPerson, setVars } from '../store/actions'

import SliderView from '../components/SliderView';

const mapStateToProps = state => {
  return {
    peopleAssumptions: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: (type,what,value) => {
      if (type==='person')
        dispatch( setPerson(what, value) )
      else
        dispatch( setVars(what, value) )
    }
  }
}

const SliderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderView)

export default SliderContainer