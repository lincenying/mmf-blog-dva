import {post} from '../utils/request'

export function comment(config) {
    return post('/api/', {
        action: 'comment',
        ...config
    })
}
export function postComment(config) {
    return post('/api/', {
        action: 'postComment',
        ...config
    })
}
