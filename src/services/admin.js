import {post} from '../utils/request'

export function posts(config) {
    return post('/api/', {
        action: 'getAdminArticle',
        limit: 20,
        ...config
    })
}

export function article(config) {
    return post('/api/', {
        action: 'getArticle',
        ...config
    })
}

export function add(config) {
    return post('/api/', {
        action: 'post',
        ...config
    })
}

export function edit(config) {
    return post('/api/', {
        action: 'modify',
        ...config
    })
}

export function deletes(config) {
    return post('/api/', {
        action: 'delete',
        ...config
    })
}

export function recovers(config) {
    return post('/api/', {
        action: 'recover',
        ...config
    })
}
