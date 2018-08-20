import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Radio from 'material-ui/Radio';
import Tooltip from 'material-ui/Tooltip';

const why = "Gender is only used for life expectancy calculations per IRS guidelines.";

export default class RGender extends Component {
	constructor(props) {
		super(props);
		this.state = {										// see bottom of file for defaults
			value: props.value,
		};
	}

	handleChange = (event, value) => {
//		console.log("changing to: "+event.target.value);
		this.setState({value: event.target.value})
		this.props.onChange(this.props.what, event.target.value);
	};

	render() {
		return (
	      	<Grid container spacing={8}>
				<Grid item xs={3} style={{marginTop: 15}}>
					{this.props.caption}
				</Grid>
				<Grid item xs={7} style={{marginBottom: -8}}>
					<Tooltip id="tooltip-icon1" title={why}>
						<span>
							<Radio
					          checked={this.state.value === 'female'}
					          onChange={this.handleChange.bind(this)}
					          value="female"
					          name="female"
					        />
					        Female
					    </span>
				    </Tooltip>
				  	<Tooltip id="tooltip-icon2" title={why}>	
				  		<span>			
					        <Radio
					          checked={this.state.value === 'male'}
					          onChange={this.handleChange.bind(this)}
					          value="male"
					          name="Male"
					        />
				        	Male
				        </span>
			      	</Tooltip>  
				</Grid>
				<Grid item xs={2} sm={4}>
					{this.props.suffix}
				</Grid>
			</Grid>
		)
  	};
}

RGender.defaultProps = {
	onChange:  (e,val) => {return true},
	value: "female",
	caption: 'Gender:',
}
