
const zeroAccum = { 
		year:0, age:0, 
		wealth: 0, spend: 0, income: 0, 	// output measures
		bRetired: false,
		retspend: 0,	ss:0.,				// grow over time
		bOutOfSavings: false,
		noteWhat: 0,
		note: ''  
	};


// Social Security
// We know (more or less) the values for full benefits today
// Use inflation to figure this out, pro-rate, re-grow with inflation
//
// https://en.wikipedia.org/wiki/Social_Security_Wage_Base
// https://www.myretirementpaycheck.org/how-my-paycheck-works/social-security/how-are-benefits-calculated?redir=301&src=/social-security/how-are-benefits-calculated
function determineSSThisAge( peopleAssumptions, year, currentIncome, age ) {

		// year is zero based
		const d = new Date();
	    const thisYear = d.getFullYear();
	    year += thisYear;		// now 4 digit year

		// SS wage base
		const kBaseYear = 2018;
		const kssWB2018 = 128400.;	// https://en.wikipedia.org/wiki/Social_Security_Wage_Base
		const kssWBGrowth = 0.028;	// derived, even though it changes considerably every year

									// SS estimator - www.ssa.gov/benefits/retirement/estimator.html
									// this is for a somewhat maxed out situation
									// 62=25K, 67=35K, 70=44K
		const kss62 = 24000;		
		const kss67 = 30000;		
		const kss70 = 36000;

		var kDeltaYears = year - kBaseYear;

		// FV = PV*(1+r)^n
		// PV = FV / ((1+r)^n)

		var ssBase = 0.0;

		if ( age < 62 )
			ssBase = 0.0;
		else if ( age < 67 )		// could be slightly more sophisticated...
			ssBase = kss62;
		else if ( age < 70 )
			ssBase = kss67;
		else
			ssBase = kss70;

		if ( kDeltaYears < 0 ) {	// already retired
			// they should be able to just give us their SS
			// - barring that, grow their last salary to now
			const kBaseWage = currentIncome * Math.pow( 1 + kssWBGrowth, -kDeltaYears);
			const kPercentageBase = Math.max( 1.0, kBaseWage / kssWB2018 );
			ssBase *= kPercentageBase;
			return ssBase;
		}

		// Retiring in future
		const kBaseWage = currentIncome / Math.pow(1 + kssWBGrowth, kDeltaYears);
		const kPercentageBase = Math.max( 1.0, kBaseWage / kssWB2018 );
		ssBase *= kPercentageBase;

		// now bring forward to present year
		const ssNow = ssBase * Math.pow( 1 + kssWBGrowth, kDeltaYears);
		return ssNow;
	}




export default class SimpleCalcs {
	years = [];			// our output, suitable for display or graphing
/*
	Savings:
		pre-retirement - income (inflation) * savings percentage
		post-retirement - nothing
	Spending:
		pre-retirement - other size of savings
		post-retirement - est. spend in retirement (inflation)
	Growth
*/
	doYear(peopleAssumptions, lastAccum, age, bYearZero) {
		var person = peopleAssumptions.person;
		var assumptions = peopleAssumptions.assumptions;

		var accum = Object.assign({}, lastAccum);	// shallow clone
		accum.noteWhat = 0;
		accum.note = '';
		accum.age = age;

		//
		// Retirement
		//
		// Capture when retirement occurs
		// and figure out Social Security benefits
		if ( bYearZero && (age >= person.retireage )) {	// starting out retired - figure out SS
			accum.ss = determineSSThisAge( peopleAssumptions, accum.year, person.currentIncome, age );

		} else if ( age === person.retireage ) {		// show essentially one year early

			accum.note = "Retirement";
			accum.ss = determineSSThisAge( peopleAssumptions, accum.year, accum.income, age );	// set SS based on retirement age

		}

		accum.bRetired = age > person.retireage;

		if (!bYearZero)
			accum.wealth += accum.wealth * assumptions.mixedGrowth;				// unclear if start of year/middle/end of year

		if ( accum.bRetired ) {

			accum.income = accum.ss;
			accum.spend = Math.min( accum.retspend, accum.wealth+accum.income);	// can't be more than we have
			accum.ss += accum.ss * assumptions.ssGrowth;						// only grows after retirement

		} else {

			if (!bYearZero)
				accum.income += accum.income * assumptions.coreInflation;

			accum.save = accum.income * (person.currentSavingsPercent / 100.0);
			accum.spend = accum.income - accum.save;

		}

		// Test in - if retired pre 62, and now out of money, get SS now!
		if ( ( accum.ss === 0. ) && ( accum.spend < accum.retspend ) ) {
			// Need SS now!
			accum.ss = determineSSThisAge( peopleAssumptions, accum.year, accum.income, age );
			accum.income = accum.ss;
			accum.spend = Math.min( accum.retspend, accum.wealth+accum.income);	// recalc - can't be more than we have
		}

		accum.save = accum.income - accum.spend;

		if (!bYearZero) {
			accum.wealth += accum.income - accum.spend;

			accum.retspend += accum.retspend * assumptions.coreInflation;		// desired spend
		}

		if ( accum.wealth <= 0 ) {

			// Out of Savings!
			accum.wealth = 0;
			if ( !accum.bOutOfSavings ) {
				accum.bOutOfSavings = true;
				accum.note = "Out of savings";
			}
		}

		return accum;
	}

	doCalcs(peopleAssumptions) {
		this.years = [];
		var person = peopleAssumptions.person;

		// create year 0
		var accum = Object.assign({}, zeroAccum);
		accum.age = person.age;

		accum.income = person.currentIncome;
		accum.spend = person.currentIncome;
		accum.wealth = person.currTotalSavings;

		accum.ss = Math.max( person.currentIncome * 0.25, 25000 );		// estimate Social Security, gross estimate
		accum.retspend = person.estSpendInRetirement;
		accum.bOutOfSavings = person.currTotalSavings < 0;

		accum = this.doYear( peopleAssumptions, accum, person.age, true );
		this.years.push(accum);		// zero year

		var showMaxAge = Math.max(100,person.age+25);
		for (var age = person.age+1; age<showMaxAge; age++) {

			accum = this.doYear( peopleAssumptions, accum, age, false );
			this.years.push(accum);
		}
	}
}


