import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import FldNumber from './FldNumber';


export default class RNumber extends Component {
	constructor(props) {
		super(props);
		this.state = {										// see bottom of file for defaults
			value: props.value,
			errorText: '',
		};
	}

	handleChange = (event, value) => {
//		this.setState({value: value})
		this.props.onChange(this.props.what, value);
	};


//  spacing={8}
// 3 5 2 2
//  style={{marginTop: 5}}
	render() {
		return (
	      	<Grid container alignItems='center'>
				<Grid item xs={3}>
					{this.props.caption}
				</Grid>
				<Grid item xs={5}>
					<FldNumber 
						type="number" 
						prefix={this.props.prefix}
						defaultValue={this.props.value}
						onChange={this.handleChange.bind(this)}
						value={this.state.value}
						thousands={this.props.thousands}
						min={this.props.min}
						max={this.props.max}
						suffix={this.props.suffix}
						/>
				</Grid>
				<Grid item xs={2}>
				</Grid>

				<Grid item xs={2}>
					{this.props.suffix}
				</Grid>
			</Grid>
		)
	};

}

// spacing={8}

RNumber.defaultProps = {
	onChange:  (what,val) => {return true},
	caption: 'Caption:',
	value: 50,
	suffix: '',
	decimalScale: 0,
}
