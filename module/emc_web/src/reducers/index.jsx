import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux'; //might need to remove

import { countryReducer } from './countryReducer';
import { coronavirusReducer } from './coronavirusReducer';
import { worldDataReducer } from './worldDataReducer';
import {infectedReducer} from './infectedReducer';

function Reducer(state = {
	isLoading: false,
	data: [],
	error: false
}
	, action = null) {
	switch (action.type) {
		case types.RECV_ERROR:
			return Object.assign({}, state, { isLoading: false, data: action.data, error: true });
		case types.RECV_DATA:
			return Object.assign({}, state, { isLoading: false, data: action.data, error: false });
		case types.REQ_DATA:
			return Object.assign({}, state, { isLoading: true, error: false });
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	infectedes: infectedReducer,
	countries: countryReducer,
	coronavirus: coronavirusReducer,
	worldData: worldDataReducer
});

export default rootReducer;