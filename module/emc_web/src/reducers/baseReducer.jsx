import * as types from '../actions/actionTypes';

function baseReducer(state = {
	isLoading: false,
	data: [],
	error: false}
, action = null) {
	switch(action.type) {
		case types.RECV_ERROR:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
		case types.RECV_DATA:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
		case types.REQ_DATA:
			return Object.assign({}, state, {isLoading: true, error: false });
		default:
			return state;
	}
};

export default baseReducer;