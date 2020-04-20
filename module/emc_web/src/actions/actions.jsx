import * as types from './actionTypes';
import axios from 'axios';

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

function receiveCoronavirusData(json, dates) {
    return {
        type: types.RECV_CORONAVIRUS_DATA,
        data: json,
        dates: dates
    }
};

function receiveCoronavirusError(json) {
    return {
        type: types.RECV_CORONAVIRUS_ERROR,
        data: json
    }
};

function receiveWorldData(new_confirmed, confirmed, recovered, deaths,
    latestData) {
    return {
        type: types.RECV_WORLD_DATA,
        new_confirmed,
        confirmed: confirmed,
        recovered: recovered,
        deaths: deaths,
        latestData: latestData
    }
};


function handleWorldData(data) {
    let dates = Object.keys(data);
    let latestData = data[dates[dates.length - 1]];
    const new_confirmed_world = latestData.map(el => el.new_confirmed).reduce((a, b) => a + b);
    const confirmed_world = latestData.map(el => el.confirmed).reduce((a, b) => a + b);
    const recovered_world = latestData.map(el => el.recovered).reduce((a, b) => a + b);
    const deaths_world = latestData.map(el => el.deaths).reduce((a, b) => a + b);
    return { new_confirmed_world, confirmed_world, recovered_world, deaths_world, latestData }
}

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
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        })
            .then(function (response) {
                let dates = Object.keys(response.data);
                dispatch(receiveCoronavirusData(response.data, dates));
                const { new_confirmed_world, confirmed_world, recovered_world, deaths_world, latestData } = handleWorldData(response.data);
                dispatch(receiveWorldData(new_confirmed_world, confirmed_world, recovered_world, deaths_world, latestData));
            })
            .catch(function (response) {
                dispatch(receiveCoronavirusError(response.data));
                //dispatch(pushState(null, '/error'));
            })
    }
};