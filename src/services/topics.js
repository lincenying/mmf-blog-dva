import {get} from '../utils/request'

export function topics(config) {
    return get('/api/frontend/topics', {
        limit: 10,
        markdown: 1,
        ...config
    })
}
