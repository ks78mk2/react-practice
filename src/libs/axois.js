import axios from 'axios';
import qs from 'qs'
axios.defaults.withCredentials = true

const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

const getConfig = (method, path, data) => {
    let url = path;

    let timeout = process.env.REACT_APP_API_TIMEOUT
    let _method = new String(method);
    if (_method && _method.toUpperCase() === 'POST' && url.indexOf('upload') === 0) {
        timeout = 120000
    }

    let config = {
        timeout: timeout,
        method: _method.toUpperCase(),
        url,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type',
            'Accept': 'application/json',
            'Accept-Language': 'ko_KR',
            'Transaction-Key': Date.now()
        }
    }

    if (data) {
        if (config.method === HTTP_METHOD.GET) {
            url = url + (url.indexOf('?') > 0 ? '&' : '?') + qs.stringify(data);
            config.url = url;
        } else {
            config.data = data;
        }
    }
    return config
}

const request = async (method, path, data) => {

    try {
        const {result} = await axiosRequest(method, path, data);
        return {result};
    } catch (error) {
        return error;
    }
}

const axiosRequest = (method, path, data) => {
    const config = getConfig(method, path, data);
    const promise = axios(config);

    return new Promise((resolve, reject) => {
        promise
            .then((response) => {
                console.log(response);
                resolve({result: response.data});
            })
            .catch((error) => {
                if (typeof error.response.data == 'string') {
                    window.location.href = '/error'
                }
                reject({error: error.response.data});
            })
    })
}

export default request;