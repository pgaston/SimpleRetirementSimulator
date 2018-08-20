


export class BaseStore {
	constructor (name, type, assetLiability, years = 40, initialValue = 0., initialInterest = 0.) {
		this.name = name;
		this.type = type;
		this.assetLiability = assetLiability;		// true means accumulating positive is 'good', going negative is a boo-boo
		this.value = initialValue;
		this.interest = initialInterest;
		this.year = 0;
		this.data = Array(years).fill(0);			// prefill with zeros
	}

	// before, say debiting an account one can see if it will bounce - and by how much
	deltaValue( delta ) {
		let temp = this.value + delta;
		let flag = this.assetLiability ? temp < 0 : temp > 0;
		this.value = flag ? 0. : temp;
		return { flag, temp };		
	}

	initRun() {
		this.year = 0;
	}

	// Called for periodic changes, e.g., interest rate accumulation
	// dt = % of a year
	runDt( dt ) {
		this.value *= (1 + (this.interest*dt));
		return this.value;
	}

	startYear( age, year, engine ) {
		// nothing
	}

	endYear( yr ) {
		this.data[year] = this.value;
	}

	endRun( engine ) {
		// nothing

	}

	dataForDisplay() {
		return this.data;
	}
}


export class BaseProduct {
	constructor (name) {
		this.name = name;
		this.stores = [];
	}

	initRun( engine ) {
		// nothing
	}

	startYear( age, year, engine ) {
		// nothing
	}

	runDt( dt ) {
		// nothing
	}

	endRun( engine ) {
		// nothing
	}
}





