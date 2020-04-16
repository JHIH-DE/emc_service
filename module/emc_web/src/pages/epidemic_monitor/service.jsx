import axios from 'axios';

//const apiHost = window.location.protocol + "//" + window.location.host;
const apiHost = 'http://localhost:9011';
const apiPrefix = '/rest/v1';

const prtgRequest = axios.create({
    baseURL: apiHost + apiPrefix
})

prtgRequest.interceptors.response.use(function (response) {
    //get response do ...
    return response;
}, function (error) {
    // get errors then...
    return Promise.reject(error);
});

prtgRequest.interceptors.request.use(function (config) {
    //before sending request,do ...
    return config;
}, function (error) {
    //get sending error,then ...
    return Promise.reject(error);
});


export const apiGetInfectedMain = () => prtgRequest.get('/infected_main', {
    validateStatus: function (status) {

        return status >= 200 && status < 300; // default 狀態碼不在區間則拒絕    
    }
})
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            console.log('Error', error.message);
        }
        console.log(error);
    });

export const apiAddInfectedMain = (perms) => prtgRequest.post('/infected_main', perms,
    {
        validateStatus: function (status) {

            return status >= 200 && status < 300; // default 狀態碼不在區間則拒絕    
        }
    })
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            console.log('Error', error.message);
        }
        console.log(error);
    });

export const apiGetCountries = () => prtgRequest.get('/countries', {
    validateStatus: function (status) {

        return status >= 200 && status < 300; // default 狀態碼不在區間則拒絕    
    }
})
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            console.log('Error', error.message);
        }
        console.log(error);
    });        