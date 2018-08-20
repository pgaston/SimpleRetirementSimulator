import { createStore } from 'redux'
import simApp from './reducers'

import { setPerson, setVars } from './actions'







it('creates GetUseVars ithout crashing', () => {

	const store = createStore(simApp)

	console.log(store.getState())

});
