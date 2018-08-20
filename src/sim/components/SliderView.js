import React from 'react'
import PropTypes from 'prop-types'

import RSlider from '../modules/RSlider';

const SliderView = ({ peopleAssumptions, onChange }) => (
	<div>
	  <RSlider
	    caption="Retirement Age" 
	    value={peopleAssumptions.person.retireage} 
	    min={peopleAssumptions.person.age} 
	    max={100} 
	    step={1}
	    suffix=" years" 
	    onChange={ (what,value) => onChange('person','retireage',value)} 
	    what='retirement'
	    />
	  <RSlider
	    caption="Compound Interest" 
	    value={peopleAssumptions.assumptions.mixedGrowth * 100.0} 
	    min={1.0} 
	    max={10.0} 
	    step={0.2}
	    suffix="%" 
	    minimumFractionDigits={1}
	    maximumFractionDigits={1}
	    onChange={ (what,value) => onChange('assumptions','mixedGrowth',value / 100.0 )} 
	    what='inflation'
	    />
    </div>
)

SliderView.propTypes = {
  peopleAssumptions: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SliderView