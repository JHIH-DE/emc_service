import * as types from '../actions/actionTypes';

export function infectedReducer(state = {
	isLoading: false,
	data: [],
	error: false}
, action = null) {
	switch(action.type) {
		case types.RECV_INFECTED_ERROR:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
		case types.RECV_INFECTED_DATA:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
		case types.REQ_INFECTED_DATA:
			return Object.assign({}, state, {isLoading: true, error: false });
		case types.UPDATA_INFECTED_DATA:
			return  { ...state,data: action.data.concat(action.newData)};
		default:
			return state;
	}
};
