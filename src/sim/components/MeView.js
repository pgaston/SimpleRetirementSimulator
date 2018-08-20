import React from 'react'
import PropTypes from 'prop-types'

import RNumber from '../modules/RNumber'


const MeView = ({ person, onChange }) => (
      <div>
        <h3>Starting off we need some information...</h3> 

        <RNumber 
          caption="Total Savings" 
          value={person.currTotalSavings} 
          prefix='$' 
          thousands='yes' 
          onChange={ (what,value) => onChange(what,value) } 
          what='currTotalSavings'
          />

        <RNumber 
          caption="Your Age" 
          value={person.age} 
          min={0} 
          max={115} 
          thousands='' 
          suffix="years" 
          onChange={ (what,value) => onChange(what,value) } 
          what='age'
          />

        <RNumber 
          caption="Estimated Spend in Retirement" 
          value={person.estSpendInRetirement} 
          prefix='$' 
          suffix='per year'
          thousands='yes' 
          onChange={ (what,value) => onChange(what,value) } 
          what='estSpendInRetirement'
          />

        <hr />
        <RNumber 
            caption="Current Income" 
            value={person.currentIncome} 
            prefix='$' 
            suffix='per year'
            thousands='yes' 
            onChange={ (what,value) => onChange(what,value) } 
            what='currentIncome'
            />

        <RNumber 
          caption="Savings Percentage" 
          value={person.currentSavingsPercent} 
          min={0} 
          max={100} 
          suffix='%' 
          thousands='' 
          onChange={ (what,value) => onChange(what,value) } 
          what='currentSavingsPercent'
          />

        <p>
        If you are already retired and not earning money,
        there is no need to enter Current Income
        </p>
      </div>
)

MeView.propTypes = {
  person: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default MeView