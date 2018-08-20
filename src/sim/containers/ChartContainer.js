import { connect } from 'react-redux'

import ChartView from '../components/ChartView';

const mapStateToProps = state => {
  return {
    peopleAssumptions: state
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

const ChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartView)

export default ChartContainer