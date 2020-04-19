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

function requestCountryData() {
    return { type: types.REQ_COUNTRY_DATA }
};

function receiveCountryData(json) {
    return {
        type: types.RECV_COUNTRY_DATA,
        data: json
    }
};

function receiveCountryError(json) {
    return {
        type: types.RECV_COUNTRY_ERROR,
        data: json
    }
};

function requestCoronavirusData() {
    return { type: types.REQ_CORONAVIRUS_DATA }
};

function receiveCoronavirusData(json) {
    return {
        type: types.RECV_CORONAVIRUS_DATA,
        data: json
    }
};

function receiveCoronavirusError(json) {
    return {
        type: types.RECV_CORONAVIRUS_ERROR,
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

export function fetchCountryData() {
    return function (dispatch) {
        dispatch(requestCountryData());
        const url = '/countries';
        return axios({
            url: apiHost + apiPrefix + url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        })
            .then(function (response) {
                dispatch(receiveCountryData(response.data));
            })
            .catch(function (response) {
                dispatch(receiveCountryError(response.data));
                //dispatch(pushState(null, '/error'));
            })
    }
};

export function fetchCoronavirusData() {
    return function (dispatch) {
        dispatch(requestCoronavirusData());
        const url = '/coronavirus';
        return axios({
            url: apiHost + apiPrefix + url,
            timeout: 100000,
            method: 'get',
            responseType: 'json'
        })
            .then(function (response) {
                dispatch(receiveCoronavirusData(response.data));
            })
            .catch(function (response) {
                dispatch(receiveCoronavirusError(response.data));
                //dispatch(pushState(null, '/error'));
            })
    }
};