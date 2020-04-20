import * as types from '../actions/actionTypes';

export function worldDataReducer(state = {
	isLoading: false,
	new_confirmed: 0,
	confirmed: 0,
	recovered: 0,
	deaths: 0,
	latestData: [],
	error: false
}
	, action = null) {
	switch (action.type) {
		case types.RECV_WORLD_DATA:
			return Object.assign({}, state, { isLoading: false, new_confirmed: action.new_confirmed, confirmed: action.confirmed, recovered: action.recovered, deaths: action.deaths, latestData: action.latestData, error: false });
		default:
			return state;
	}
};
