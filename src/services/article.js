import {post} from '../utils/request'

export function article(config) {
    return post('/api/frontend/article', {
        markdown: 1,
        ...config
    })
}
