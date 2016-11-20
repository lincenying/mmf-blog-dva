import {post} from '../utils/request'

export function comment(config) {
    return post('/api/frontend/comment/list', {
        ...config
    })
}
export function postComment(config) {
    return post('/api/frontend/comment/post', {
        ...config
    })
}
