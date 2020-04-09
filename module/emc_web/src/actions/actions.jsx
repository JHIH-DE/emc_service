import * as types from './actionTypes';
import axios from 'axios';
//import { pushState } from 'redux-react-router';

const apiHost = 'http://localhost:9011';
const apiPrefix = '/rest/v1';

function requestData() {
    return { type: types.REQ_DATA }
};

function receiveData(json) {
    return {
        type: types.RECV_DATA,
        data: json
    }
};

function receiveError(json) {
    return {
        type: types.RECV_ERROR,
        data: json
    }
};

export function fetchData(url) {
    return function (dispatch) {
        dispatch(requestData());
        return axios({
            url: apiHost + apiPrefix + url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        })
            .then(function (response) {
                dispatch(receiveData(response.data));
            })
            .catch(function (response) {
                dispatch(receiveError(response.data));
                //dispatch(pushState(null, '/error'));
            })
    }
};