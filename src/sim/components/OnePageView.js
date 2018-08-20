import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import MeContainer from '../containers/MeContainer'
import SliderContainer from '../containers/SliderContainer'
import ChartContainer from '../containers/ChartContainer'
//import TestContainer from '../containers/TestContainer'	// testing redux usage...


// Note: View is responsive based on screen size          
const OnePageView = () => (
      	<Grid container>
			<Grid item xs={12} sm={10} md={5} lg={3}>
	    		<Paper style={{padding: 8, margin: 8}} elevation={4}>
	    			<MeContainer />
	    		</Paper>
	    	</Grid>

			<Grid item xs={12} sm={12} md={7} lg={9}>
		    	<Grid container>

					<Grid item xs={12} sm={10} md={8} lg={6}>
			    		<Paper style={{padding: 8, margin: 8}} elevation={4}>
							<SliderContainer />
			    		</Paper>
			    	</Grid>

					<Grid item xs={12} sm={12} md={12} lg={12}>	
		    			<Paper style={{padding: 8, margin: 8}} elevation={4}>
							<ChartContainer />
			    		</Paper>
			    	</Grid>

		    	</Grid>
			</Grid>
{/*			<Grid item xs={12}>
	    		<Paper style={{padding: 8, margin: 8, float: 'left'}} elevation={4}>
	    			Testing
					<TestContainer />
	    		</Paper>
	    	</Grid>
*/}
	    </Grid>
)

export default OnePageView

