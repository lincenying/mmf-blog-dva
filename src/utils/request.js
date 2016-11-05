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

export function request(config) {
    return axios.request(config)
}

export function get(url, config) {
    return axios.get(url, config)
}

export function post(url, data, config) {
    return axios.post(url, data, config)
}
