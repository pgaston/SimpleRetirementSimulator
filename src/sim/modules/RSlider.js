import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';

export default class RSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
		};
	}

	handleChange = (event, value) => {
		this.setState({ value: value });
		this.props.onChange(this.props.what, value);
	};

	showValue = function() {
		var a = this.state.value.toLocaleString ( navigator.language, 
						{ minimumFractionDigits: this.props.minimumFractionDigits,
						  maximumFractionDigits: this.props.maximumFractionDigits, });
		return a;
	};

	render() {		// width - always something 'reasonable' ???
		return (
	      	<Grid container alignItems="center" spacing={8}>
				<Grid item xs={4}>
					{this.props.caption}
				</Grid>
				<Grid item xs={6}>
					<Slider min={this.props.min} 
							max={this.props.max} 
							step={this.props.step}
							value={this.state.value}
							onChange={this.handleChange.bind(this)}
							styles={{touchAction: 'manipulation'}}
						/>
				</Grid>
				<Grid item xs={2} style={{textAlign: 'center',}}>
					&nbsp;
					{this.props.prefix}{this.showValue()}{this.props.suffix}
				</Grid>
			</Grid>
		);
  	}
}

RSlider.defaultProps = {
	onChange:  (what,newValue) => {return true},
	caption: 'Caption:',
	what: 'should be set - PropTypes...',
	value: 50,
	min: 0,
	max: 100,
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
	prefix: '',
	suffix: '',
	step: 1,
}