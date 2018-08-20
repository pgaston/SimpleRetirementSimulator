import { connect } from 'react-redux'

import TestView from '../components/TestView';

const mapStateToProps = state => {
  return {
  	person: state.person
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

const TestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestView)

export default TestContainer