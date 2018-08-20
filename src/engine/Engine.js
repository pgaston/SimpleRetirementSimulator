// Engine
//
// - holds shared variables (run-time variables)
// - holds internal objects for simulation - stores, products
// - runs the iteration
// - prepares data for graphing
//


// Global variables to drive the simulation
export class EngineVars {
	constructor () {
		this.duration = 40

			// Note, variables can be dynamically added
			// examples
		this.startAge = 50;				// eventually managed 
		this.taxableIncome = 0;		// per dt
		
	}
}



export class Engine {

	constructor ( dt = 1. ) {
		this.variables = {			// run-time variables
			duration: 40,

			// Note, variables can be dynamically added


			// examples
			age: 50,				// eventually managed 
			taxableIncome: 0,		// per dt
		};
		this.stores = {};			// MoneyStores - accumulate data to graph
		this.products = {};			// Interesting products - from IRAs to funding college tuition - logic on top of store(s)
		this.dt = dt;

		// specific variables to engine run-time
		this.year = 0;				// zero based
		this.baseyear = (new Date()).getFullYear();
	}

	// variables
	set(name,value) {
		this.variables[name] = what;
	}

	get(name) {
		console.assert(name in this.variables,"engine variable get with missing name: ${name}");
		return this.variables[name];
	}



	inject( type, name, what ) {
		var oDict = this[type];
		console.assert(oDict != null,"engine injection with unknown type: ${type}");
		console.assert(not name in oDict,"engine variable injection with already existing name: ${name}");
		oDict[name] = what;
	}

	retrieve( type, name ) {
		var oDict = this[type];
		console.assert(oDict != null,"engine injection with unknown type: ${type}");
		console.assert(name in oDict,"engine variable retrieval with missing name: ${name}");
		return oDict[name];
	}

	startRun() {
		this.year = 0;
		console.log("startRun(${this.dt})");
	}

	endRun() {
		console.log("endRun");
	}

	// run to completion
	// note all the lifecycle elements
	// some may be removed at some point
	run( dt ) {
		startRun();

		// 1. Initialize
		this.stores.forEach( store => { store.initRun( this ); });
		this.products.forEach( product => { product.initRun( this ); });

		for ( var year=0; year <= this.variables.duration; year += 1 ) {

			this.stores.forEach( store => { store.startYear( this ); });
			this.products.forEach( product => { product.startYear( year, this ); });

			for ( var dt=0; dt < 1; dt += this.dt ) {

				// Phases of periodicity
				this.stores.forEach( store => { store.initDt( year+dt, this ); });
				this.products.forEach( product => { product.initDt( year+dt, this ); });

				this.products.forEach( product => { product.runDt( year+dt, this ); });
				this.stores.forEach( store => { store.runDt( year+dt, this ); });

				this.products.forEach( product => { product.endDt( year+dt, this ); });
				this.stores.forEach( store => { store.endDt( year+dt, this ); });
			}
			this.products.forEach( product => { product.endYear( year, this ); });
			this.stores.forEach( store => { store.endYear( year, this ); });
		}

		this.products.forEach( product => { product.endRun( this ); });
		this.stores.forEach( store => { store.endRun( this ); });
		endRun();
	}



	// get data ready for display
	// need...
	// [ { year: 2017, age: 50, IRA: 12000, spend: 65000, ... }, 
	//	 { year: 2018, age: 51, IRA: 13000, spend: 68000, ... }, 
	//	...
	//	]
	dataForDisplay( wants ) {
		let vvData = wants.map( w => this.scopes[w].dataForDisplay );		// get the data

		var vDisplay = [];



	}


}