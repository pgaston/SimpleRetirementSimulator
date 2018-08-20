import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';

export default class FldNumber extends Component {
	constructor(props) {
		super(props);
		this.state = {										// see bottom of file for defaults
			value: props.value,
		};
	}

	doChange = (event, num) => {
//		console.log("changing to: "+String(num));
		this.setState({value: String(num)})
		this.props.onChange(event, num);
	};

	handleChange = (event, value) => {
		var aNum = event.target.value;
		aNum = aNum.substr(this.props.prefix.length);	// remove prefix
		aNum = aNum.replace(/,/g, '');		// remove commas
		var num = Number(aNum);

		this.doChange(event, num);
	};


	handleConditionalChange = (event, value) => {
//		console.log("conditional change: "+event.target.value);
		var num = Number(event.target.value);

		if (num<this.props.min) {
			this.setState({value: this.props.min})
			return;
		}

		if (num>this.props.max) {
			this.setState({value: this.props.max})
			return;
		}

		this.doChange(event, num);
	};
/*
	componentDidUpdate(prevProps, prevState) {
	  if (this.state.value !== prevState.value) {
	    console.log("componentDidUpdate from "+prevState.value+" to "+this.state.value);  
	  }
	}
*/
	render() {
		return ((this.props.thousands !== 'yes')?(
				<div style={{whiteSpace: 'nowrap'}}>
					{this.props.prefix}
					<TextField 
						type="number" 
						onChange={this.handleConditionalChange.bind(this)}
						step={this.props.step}
						value={this.state.value}
						/>
				</div>
			) : (
				<NumberFormat 
					value={this.state.value}
					onChange={this.handleChange.bind(this)}
					thousandSeparator={true} 
					prefix={this.props.prefix} 
					decimalScale={this.props.decimalScale}
					customInput={TextField}
					id="fmt-num"
			    	/>				
		));
  	}
}

FldNumber.defaultProps = {
	onChange:  (e,val) => {return true},
	value: 0,
	thousands: '',
	min: Number.NEGATIVE_INFINITY,
	max: Number.POSITIVE_INFINITY,
	step: '',
	prefix: '',
	decimalScale: 0,
}




/*
					InputProps={{ inputProps: { min: 0, max: 10 } }}
			        min={this.props.min}
			        max={this.props.min}

				<NumberFormat 
					 	style={styles.numFormat}
						value={this.state.value}
						onChange={this.handleChange.bind(this)}
						thousandSeparator={true} 
						prefix={this.props.prefix} 
						decimalScale={this.props.decimalScale}
						customInput={TextField}
						id="RNumber-format-input"
				    	/>
				<NumberInput
			        id="num"
			        value={this.state.value}
			        required
			        defaultValue={this.props.defaultValue}
			        min={this.props.min}
			        max={this.props.min}
			        strategy="warn"
			        errorText={this.state.errorText}
			        onValid={this.onValid.bind(this)}
			        onChange={this.handleChange.bind(this)}
			        onError={this.onError.bind(this)}
			        onRequestValue={this.onRequestValue.bind(this)}
			        onKeyDown={this.onKeyDown.bind(this)} />

*/