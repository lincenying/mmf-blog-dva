import {get, post} from '../utils/request'

export function posts(config) {
    return get('/api/admin/topics', {
        limit: 20,
        ...config
    })
}

export function article(config) {
    return post('/api/admin/article', {
        ...config
    })
}

export function add(config) {
    return post('/api/admin/article/post', {
        ...config
    })
}

export function edit(config) {
    return post('/api/admin/article/modify', {
        ...config
    })
}

export function deletes(config) {
    return post('/api/admin/article/delete', {
        ...config
    })
}

export function recovers(config) {
    return post('/api/admin/article/recover', {
        ...config
    })
}
