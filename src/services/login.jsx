import {post} from '../utils/request'

export function login(config) {
    return post('/api/', {
        action: 'login',
        ...config
    })
}
