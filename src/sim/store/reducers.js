import { combineReducers } from 'redux'
import {
  SET_PERSON,
  SET_VARS,
} from './actions'

const defaultPerson = { 
          gender: 'female', 
          age: 50, 
          retireage: 65, 
          currTotalSavings: 250000, 
          currentIncome: 75000,  
          currentSavingsPercent: 10,
          estSpendInRetirement: 60000,
        }

const defaultAssumptions = { 
          coreInflation: 0.02,
          ssGrowth: 0.02,
          mixedGrowth: 0.06,    // all growth, rather aggressive
        }

function person(state = defaultPerson, action) {
  switch (action.type) {
    case SET_PERSON:
      let oP = {};
      oP[action.payload.what] = action.payload.value;
      return Object.assign({}, state, oP );
    default:
      return state
  }
}

function assumptions(state = defaultAssumptions, action) {
  switch (action.type) {
    case SET_VARS:
      let oP = {};
      oP[action.payload.what] = action.payload.value;
      return Object.assign({}, state, oP );
    default:
      return state
  }
}

const simApp = combineReducers({
  person,
  assumptions
})

export default simApp