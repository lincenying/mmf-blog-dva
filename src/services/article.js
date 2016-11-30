import {get} from '../utils/request'

export function article(config) {
    return get('/api/frontend/article', {
        markdown: 1,
        ...config
    })
}
