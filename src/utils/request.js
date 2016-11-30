import axios from 'axios'
import NProgress from 'nprogress'
import qs from 'qs'

axios.interceptors.request.use(config => {
    NProgress.start()
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    config.data = qs.stringify(config.data)
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    NProgress.done()
    return response
}, error => {
    NProgress.done()
    return Promise.reject(error)
})

function checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
        if (+response.data.code === 200) return response
        else throw new Error(response.data.message) // eslint-disable-line
    }
    throw new Error(response.statusText) // eslint-disable-line
}

export function request(config) {
    return axios.request(config).then(checkStatus)
}

export function get(url, params) {
    return axios.get(url, {
        params
    }).then(checkStatus)
}

export function post(url, data, config) {
    return axios.post(url, data, config).then(checkStatus)
}
