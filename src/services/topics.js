import {post} from '../utils/request'

export function topics(config) {
    return post('/api/', {
        action: 'getArticleList',
        limit: 10,
        markdown: 1,
        ...config
    })
}
