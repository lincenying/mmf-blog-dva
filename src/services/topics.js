import {post} from '../utils/request'

export function topics(config) {
    return post('/api/frontend/topics', {
        limit: 10,
        markdown: 1,
        ...config
    })
}
