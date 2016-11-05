import {post} from '../utils/request'

export function article(config) {
    return post('/api/', {
        action: 'article',
        markdown: 1,
        ...config
    })
}
