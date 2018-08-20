import React from 'react'
import Typography from '@material-ui/core/Typography';

// Note: the fixed width is needed else the drawer 'grows' to the full width of the screen
// based on the text component.
const AboutText = ({ person }) => (
	<div style={{padding: '10px', width: '325px'}}> 
		<Typography variant="title" gutterBottom>
			(Simple) Retirement Visualization
		</Typography>
		<br />

		<Typography>
			This visualization does simple modeling to show 
			your retirement funding. Built into this model is the 
			assumption that you will take social security at the
			appropriate time, i.e., if you can afford to wait it 
			waits to get the maximum value.<br /><br />

			This visualization is based on some simple inputs:
			<ul>
				<li>Current total savings</li>
				<li>Starting age</li>
				<li>Spending need per year in retirement</li>
			</ul>
			and, for those not already retired
			<ul>
				<li>Current yearly income</li>
				<li>Percentage of that income put into savings</li>
			</ul>

			Two inputs can be dynamically controlled
			<ul>
				<li>Age of retirement</li>
				<li>Compound interest that will grow savings.</li>
			</ul>

		</Typography>

		<br />

		<Typography variant="body1">
			Coming soon... a more sophisticated model...
		</Typography>


	</div>
)


export default AboutText